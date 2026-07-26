import time
class BarrierGateController:
    def __init__(self, relay): self.relay = relay
    def open_for_authorized_event(self, event: dict, seconds: float = 1.0) -> bool:
        if event.get("source") not in {"ALPR", "FASTAG", "QR"} or not event.get("authorized"):
            return False
        self.relay.on(); time.sleep(seconds); self.relay.off(); return True
