import time
import threading
from app import app  # Import app instance
from app.models import db, ParkingHistory

def simulate_large_query(batch_size=500, page=1):
    with app.app_context():  # ✅ Ensure app context is active
        start_time = time.time()

        results = db.session.query(ParkingHistory) \
        .limit(batch_size) \
        .all()  

    end_time = time.time()
    print(f"✅ Queried {len(results)} parking history records in {end_time - start_time:.4f} seconds.")

threads = []

for _ in range(10):  # 10 concurrent queries
    t = threading.Thread(target=simulate_large_query, args=(10000,))
    threads.append(t)
    t.start()

# Wait for all threads to finish
for t in threads:
    t.join()

if __name__ == "__main__":
    simulate_large_query()
