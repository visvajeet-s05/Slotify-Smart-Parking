class LowConfidenceValidator:
    def __init__(self, model): self.model = model
    def validate(self, image, slot_id: str, confidence: float) -> bool | None:
        if not 0.15 <= confidence < 0.40: return None
        answer = self.model.ask(image, f"Is a vehicle parked in Slot ID {slot_id}? Answer yes or no.")
        return "yes" in str(answer).lower()
