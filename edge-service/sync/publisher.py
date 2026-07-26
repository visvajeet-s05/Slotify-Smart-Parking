import json
import sqlite3
import time

SHORT = {"AVAILABLE":"A", "RESERVED":"R", "OCCUPIED":"O", "VIOLATION":"V", "EV_CHARGING":"E"}
class EdgePublisher:
    def __init__(self, db_path, mqtt_client):
        self.db, self.client = sqlite3.connect(db_path), mqtt_client
        self.db.execute("CREATE TABLE IF NOT EXISTS slot_delta (slot_id TEXT PRIMARY KEY, status TEXT NOT NULL, changed_at INTEGER NOT NULL)")
    def publish_change(self, lot_id, slot_id, status):
        stamp = int(time.time())
        self.db.execute("INSERT INTO slot_delta VALUES (?, ?, ?) ON CONFLICT(slot_id) DO UPDATE SET status=excluded.status, changed_at=excluded.changed_at", (slot_id, status, stamp)); self.db.commit()
        payload = json.dumps({"s":slot_id,"v":SHORT[status],"t":stamp}, separators=(",", ":"))
        if len(payload.encode()) >= 50: raise ValueError("Event exceeds 50-byte budget")
        self.client.publish(f"slotify/v1/lot/{lot_id}/slot/{slot_id}/event", payload, qos=1)
