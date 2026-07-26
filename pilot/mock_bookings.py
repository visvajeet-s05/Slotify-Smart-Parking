from datetime import datetime, timedelta

def get_current_time():
    return datetime.now()

def get_mock_bookings():
    """
    Returns mock booking fixtures covering all 4 reconciliation cases.
    Edit slot_ids to match your defined slots in slots.json.
    """
    now = get_current_time()
    
    return {
        # CASE 1: ACTIVE / NORMAL - Car expected to be present
        "SLOT_A1": {
            "booking_id": "BK-1001",
            "status": "ACTIVE",
            "start_time": now - timedelta(minutes=30),
            "end_time": now + timedelta(minutes=30)
        },
        
        # CASE 3: EXPIRED / OVERSTAY - Car present past end time
        "SLOT_A2": {
            "booking_id": "BK-1002",
            "status": "ACTIVE",
            "start_time": now - timedelta(hours=2),
            "end_time": now - timedelta(minutes=5) # Expired 5 mins ago
        },
        
        # CASE 4: NO-SHOW / UPCOMING - Reserved >15 mins ago, car not present
        "SLOT_A3": {
            "booking_id": "BK-1003",
            "status": "UPCOMING",
            "start_time": now - timedelta(minutes=20), # 20 mins late
            "end_time": now + timedelta(hours=1)
        },
        
        # CASE 2: UNPAID - No booking exists for this slot (explicitly returns None)
        "SLOT_A4": None
    }

def get_booking(slot_id: str) -> dict | None:
    bookings = get_mock_bookings()
    return bookings.get(slot_id, None)
