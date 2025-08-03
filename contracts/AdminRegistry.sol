// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.10;

contract AdminRegistry {
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

    // Constructor with hashed CNIC
    constructor(bytes32 hashedCNIC) {
        // For simplicity, assume msg.sender knows the correct CNIC
        // which was hashed off-chain before deployment
        require(
            keccak256(abi.encodePacked("3520212345678")) == hashedCNIC,
            "Invalid CNIC"
        );
        superAdmin = msg.sender;
    }

    // Admin controls
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

    // Voting function
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

    // View functions
    function getCandidateCount() external view returns (uint) {
        return candidates.length;
    }

    function getCandidate(uint id) external view returns (
        string memory name,
        SetType set,
        string memory district,
        uint voteCount
    ) {
        Candidate memory c = candidates[id];
        return (c.name, c.set, c.district, c.voteCount);
    }

    function hasNICVoted(string memory nic) external view returns (bool) {
        return votersByNIC[nic].hasVoted;
    }
}
