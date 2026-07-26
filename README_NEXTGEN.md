# Slotify next-generation modules

The new modules implement the target topology without disrupting the existing app:

- `packages/db`: MySQL 8 Prisma data contract.
- `packages/mqtt-client`: mTLS-only, sub-50-byte slot delta transport.
- `apps/websocket-server`: Redis Stream consumer with lot-scoped Socket.io broadcast.
- `edge-service`: BEV calibration, tracking, VLM thresholding, offline event storage, and gate control primitives.
- `apps/pricing-service`: PPO-compatible Gymnasium environment and FastAPI prediction endpoint.
- `circuits` and `packages/web3-sdk`: privacy-preserving settlement interfaces.

Before deployment, install each workspace's declared dependencies with pnpm, generate Prisma clients against a MySQL 8 database, and configure Mapbox, EMQX mTLS, Redis, and a vetted ERC-4337 provider. Never expose RTSP URLs, private keys, or client certificates to the browser.
