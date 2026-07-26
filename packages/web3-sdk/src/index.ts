export type OccupancyProof = { proof: unknown; publicSignals: string[] };
export interface SettlementClient { payPerMinute(input: { bookingId: string; amountWei: bigint }): Promise<{ userOpHash: `0x${string}` }>; verifyOccupancy(proof: OccupancyProof): Promise<boolean>; }
// Implementations must use a production ERC-4337 bundler/paymaster and generated verifier ABI; no private keys belong in this package.
