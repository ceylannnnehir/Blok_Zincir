// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract Election {
    address public owner;
    bool public isVotingActive;

    struct Voter {
        bool isRegistered;
        bool hasVoted;
    }

    mapping(address => Voter) public voters;

    uint64 public votesForCandidateA;
    uint64 public votesForCandidateB;

    constructor(address[] memory voterAddresses) {
        owner = msg.sender;
        isVotingActive = true;

        for (uint i = 0; i < voterAddresses.length; i++) {
            voters[voterAddresses[i]] = Voter(true, false);
        }
    }

    function vote(uint8 candidateId) public {
        require(isVotingActive, "Voting is over");
        require(voters[msg.sender].isRegistered, "Not an authorized voter");
        require(!voters[msg.sender].hasVoted, "Already voted");

        if (candidateId == 1) {
            votesForCandidateA++;
        } else if (candidateId == 2) {
            votesForCandidateB++;
        } else {
            revert("Gecersiz aday");
        }

        voters[msg.sender].hasVoted = true;
    }

    function getResults() public view returns (uint64, uint64) {
        return (votesForCandidateA, votesForCandidateB);
    }

    function endVoting() public {
        require(msg.sender == owner, "Only owner can end voting");
        isVotingActive = false;
    }

    function getVoter(address voterAddress) public view returns (bool authorized, bool voted) {
        Voter memory v = voters[voterAddress];
        return (v.isRegistered, v.hasVoted);
    }
}
