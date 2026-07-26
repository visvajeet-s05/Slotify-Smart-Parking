pragma circom 2.1.6;
// The enclave signature is verified off-circuit before proving; no video input enters this circuit.
template OccupancyProof() {
  signal input slotStatus;
  signal input enclaveCommitment;
  signal input expectedCommitment;
  signal output occupied;
  component status = IsEqual(); status.in[0] <== slotStatus; status.in[1] <== 1;
  component commitment = IsEqual(); commitment.in[0] <== enclaveCommitment; commitment.in[1] <== expectedCommitment;
  occupied <== status.out * commitment.out;
}
component main {public [expectedCommitment]} = OccupancyProof();
