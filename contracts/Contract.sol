// SPDX-License-Identifier: GPL-3.0-or-later
//0x839831B154301276E6A95Fa5f12b4a3352D67bf6
pragma solidity ^0.8.10;


contract VotingSystem {
    address public superAdmin;
    bool public electionStarted;

    enum SetType { NA, PA }

    struct Candidate {
        uint id;
        string name;
        SetType set;
        string district;
        uint voteCount;
    }

    struct Voter {
        string nic; // NIC-based identity
        bool hasVoted;
    }

    Candidate[] public candidates;
    mapping(address => bool) public subAdmins;
    mapping(string => Voter) public votersByNIC;

    modifier onlySuperAdmin() {
        require(msg.sender == superAdmin, "Not super admin");
        _;
    }

    modifier onlySubAdmin() {
        require(subAdmins[msg.sender], "Not sub-admin");
        _;
    }

    modifier electionIsActive() {
        require(electionStarted, "Election not started");
        _;
    }

    constructor() {
        superAdmin = msg.sender;
    }

    // --- Admin Functions ---

    function addSubAdmin(address _admin) external onlySuperAdmin {
        subAdmins[_admin] = true;
    }

    function removeSubAdmin(address _admin) external onlySuperAdmin {
        subAdmins[_admin] = false;
    }

    function startElection() external onlySuperAdmin {
        electionStarted = true;
    }

    function stopElection() external onlySuperAdmin {
        electionStarted = false;
    }

    function registerCandidate(
        string memory _name,
        SetType _set,
        string memory _district
    ) external onlySuperAdmin {
        candidates.push(Candidate({
            id: candidates.length,
            name: _name,
            set: _set,
            district: _district,
            voteCount: 0
        }));
    }

    // --- Voting Function ---

    function castVote(string memory nic, uint candidateId)
        external
        onlySubAdmin
        electionIsActive
    {
        Voter storage voter = votersByNIC[nic];
        require(!voter.hasVoted, "NIC already voted");

        voter.nic = nic;
        voter.hasVoted = true;
        candidates[candidateId].voteCount++;
    }

    // --- View Functions ---

    function getCandidateCount() external view returns (uint) {
        return candidates.length;
    }

    function getCandidate(uint id) external view returns (
        string memory name,
        SetType set,
        string memory bio,
        uint voteCount
    ) {
        Candidate memory c = candidates[id];
        return (c.name, c.set, c.district, c.voteCount);
    }

    function hasNICVoted(string memory nic) external view returns (bool) {
        return votersByNIC[nic].hasVoted;
    }
}
