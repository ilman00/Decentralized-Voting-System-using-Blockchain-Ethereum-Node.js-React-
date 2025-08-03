// lib/electionState.js

let electionStatus = 'stopped'
let startTime = null
let endTime = null

export function getElectionState() {
  return { electionStatus, startTime, endTime }
}

export function setElectionState(newStatus, start, end) {
  electionStatus = newStatus
  startTime = start
  endTime = end
}
