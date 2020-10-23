import requests
import time
import datetime

x = requests.get('http://10.3.2.187/tme.xml')


while x.status_code == 200:
    print(f"Cas: {datetime.datetime.now()}, kod {x.status_code} - OK")
    time.sleep(15)
else:
    print(f"Cas: {datetime.datetime.now()}, kod {x.status_code} - !")

print()