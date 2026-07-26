# Slotify real-time relay

MQTT ingestion writes normalized messages to `slotify:events`; this service consumes them once through a Redis consumer group and broadcasts only to `lot:{id}` rooms. Authentication must populate the Socket.io user role before accepting client mutation events.
