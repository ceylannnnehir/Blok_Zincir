require("@nomicfoundation/hardhat-chai-matchers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Election Contract", function () {
  let Election, election, owner, voter1, voter2, voter3, nonVoter;

  beforeEach(async function () {
    [owner, voter1, voter2, voter3, nonVoter] = await ethers.getSigners();
    const addresses = [voter1.address, voter2.address, voter3.address];
    Election = await ethers.getContractFactory("Election");
    election = await Election.deploy(addresses);
    await election.deployed();
  });

  it("1 - Sözleşme başarılı bir şekilde ağa yüklenebiliyor mu?", async function () {
    expect(await election.owner()).to.equal(owner.address);
  });

  it("2 - Bir seçmen başarılı bir şekilde oyunu kullanabiliyor mu?", async function () {
    await election.connect(voter1).vote(1);
    const [aVotes, bVotes] = await election.getResults();
    expect(aVotes.toNumber()).to.equal(1);
  });

  it("3 - Seçmen olmayan bir hesap oy kullanamaz", async function () {
    await expect(election.connect(nonVoter).vote(1)).to.be.revertedWith("Not an authorized voter");
  });

  it("4 - Aynı seçmen ikinci kez oy kullanamaz", async function () {
    await election.connect(voter1).vote(1);
    await expect(election.connect(voter1).vote(1)).to.be.revertedWith("Already voted");
  });

  it("5 - Oy verme işlemi sayaçları doğru artırıyor mu?", async function () {
    await election.connect(voter1).vote(1);
    const [aVotes, bVotes] = await election.getResults();
    expect(aVotes.toNumber()).to.equal(1);
    expect(bVotes.toNumber()).to.equal(0);
  });

  it("6 - İki farklı kişi aynı adaya oy verince sayaç 2 oluyor mu?", async function () {
    await election.connect(voter1).vote(1);
    await election.connect(voter2).vote(1);
    const [aVotes] = await election.getResults();
    expect(aVotes.toNumber()).to.equal(2);
  });

  it("7 - Oy vermeyi sadece sözleşme sahibi sonlandırabilir", async function () {
    await expect(election.connect(voter1).endVoting()).to.be.revertedWith("Only owner can end voting");
    await election.connect(owner).endVoting();
    expect(await election.isVotingActive()).to.equal(false);
  });

  it("8 - Seçmen, oy verme sonlandırıldıktan sonra oy veremez", async function () {
    await election.connect(owner).endVoting();
    await expect(election.connect(voter1).vote(1)).to.be.revertedWith("Voting is over");
  });
});
