## ✈️ AeroSkyOps Aviation
AeroSkyOps is a full-stack aircraft operations management platform designed to modernize airport workflows. Originally developed while working in aviation, the system replaces outdated manual processes with a structured, real-time dashboard for managing aircraft parking, fuel requests, and owner tracking.

The platform is actively deployed for internal use at a private airport and integrates features like live flight tracking, weather data, and dynamic aircraft assignments.

Built with Flask, React, Redux, PostgreSQL, Docker, AWS (S3 + EC2), Cloudinary, and Nginx, AeroSkyOps is designed for operational efficiency, high availability, and user-friendly performance.

## 🔄 Project Status
✅ Actively deployed and in use for internal operations.
No new feature updates are currently being pushed — the platform is in a stable, production-ready state.

### Live Link

https://www.aeroskyops.com/

##

### SkyhighOps Images 

![AeroSkyOps]

![Home](https://res.cloudinary.com/djuzk5um3/image/upload/v1737319339/SkyHighOps/01_eho9t4.png)

![Area Parking Spots](https://res.cloudinary.com/djuzk5um3/image/upload/v1737319344/SkyHighOps/02_Airport_Areas_mxlstm.png)

![Aircraft Details](https://res.cloudinary.com/djuzk5um3/image/upload/v1737319350/SkyHighOps/03_Aircraft_Details_p9teof.png)

![Aircraft Status](https://res.cloudinary.com/djuzk5um3/image/upload/v1737319371/SkyHighOps/04_Aircraft_Status_a9femd.png)

![Airport Weather Status](https://res.cloudinary.com/djuzk5um3/image/upload/v1737319376/SkyHighOps/05_Airport_Weather_Status_yjio9v.png)

![Fuel Request](https://res.cloudinary.com/djuzk5um3/image/upload/v1737319386/SkyHighOps/06_FueL_Request_Order_jdsz94.png)

![Tank Levels](https://res.cloudinary.com/djuzk5um3/image/upload/v1737319390/SkyHighOps/07_All_Tanks_hd58go.png)

##

## Endpoints

### Log in user

* Method: Post

* URL:/api/auth/login

```json
{
  "email": "andres@aa.io",
  "password": "password"
}
```
* Successful Response:
```json
{
    "email": "andres@aa.io",
    "employee_id": "b63e67e5-403b-4c38-bb08-325fd4031076",
    "firstname": "Andres",
    "id": 4,
    "lastname": "Martinez",
    "username": "andres"
}
```
##

### Get all airport areas

* Method: GET

* URL:/api/airport_parkings/all_places/with_parking_spots

```json
{
    "airport": [
        "North",
        "East",
        "West",
        "South"
    ]
}
```
##

### Get parking spots that correspond to that area

* Method: GET

* URL:/api/airport_parkings/all_places

```json
{
    "airport": [
        {
            "id": 1,
            "area_name": "North",
            "parking_spots": [
                {
                    "airport_parking_id": 1,
                    "id": 1,
                    "is_reserved": "Yes",
                    "spot_number": "A1",
                    "spot_size": "Large",
                    "user_id": 1
                },
                {
                    "airport_parking_id": 1,
                    "id": 2,
                    "is_reserved": "Yes",
                    "spot_number": "A2",
                    "spot_size": "Medium",
                    "user_id": 2
                },
                {
                    "airport_parking_id": 1,
                    "id": 9,
                    "is_reserved": "Yes",
                    "spot_number": "E1",
                    "spot_size": "Small",
                    "user_id": 4
                },
                {
                    "airport_parking_id": 1,
                    "id": 10,
                    "is_reserved": "Yes",
                    "spot_number": "E2",
                    "spot_size": "Large",
                    "user_id": 1
                }
            ]
        },
        {
            "id": 2,
            "area_name": "East",
            "parking_spots": [
                {
                    "airport_parking_id": 2,
                    "id": 3,
                    "is_reserved": "Yes",
                    "spot_number": "B1",
                    "spot_size": "Small",
                    "user_id": 3
                },
                {
                    "airport_parking_id": 2,
                    "id": 4,
                    "is_reserved": "Yes",
                    "spot_number": "B2",
                    "spot_size": "Large",
                    "user_id": 4
                },
                {
                    "airport_parking_id": 2,
                    "id": 11,
                    "is_reserved": "Yes",
                    "spot_number": "E4",
                    "spot_size": "Large",
                    "user_id": 1
                },
                {
                    "airport_parking_id": 2,
                    "id": 12,
                    "is_reserved": "No",
                    "spot_number": "E332",
                    "spot_size": "Large",
                    "user_id": 1
                }
            ]
        },
        {
            "id": 3,
            "area_name": "West",
            "parking_spots": [
                {
                    "airport_parking_id": 3,
                    "id": 5,
                    "is_reserved": "Yes",
                    "spot_number": "C1",
                    "spot_size": "Medium",
                    "user_id": 4
                },
                {
                    "airport_parking_id": 3,
                    "id": 6,
                    "is_reserved": "Yes",
                    "spot_number": "C2",
                    "spot_size": "Small",
                    "user_id": 1
                }
            ]
        },
        {
            "id": 4,
            "area_name": "South",
            "parking_spots": [
                {
                    "airport_parking_id": 4,
                    "id": 7,
                    "is_reserved": "Yes",
                    "spot_number": "D1",
                    "spot_size": "Large",
                    "user_id": 2
                },
                {
                    "airport_parking_id": 4,
                    "id": 8,
                    "is_reserved": "Yes",
                    "spot_number": "D2",
                    "spot_size": "Medium",
                    "user_id": 3
                }
            ]
        }
    ]
}
```
##

### Add a parking spot to an airport area 

* Method: POST

* URL:/api/parking_spots/new

```json
{
    "airport_parking_id":"1",
    "spot_number":"N92",
    "spot_size":"Small",
    "is_reserved":"No"
}
```
* Successful Response:
```json
{
    "airport_parking_id": 1,
    "id": 13,
    "is_reserved": "No",
    "spot_number": "N92",
    "spot_size": "Small",
    "user_id": 4
}
```
##

### Get a parking spot by ID

* Method: GET

* URL:/api/airport_parkings/:parkingId

```json
{
    "airport_parking_id": 4,
    "id": 8,
    "is_reserved": "Yes",
    "spot_number": "D2",
    "spot_size": "Medium",
    "user_id": 3
}
```
##

### Update parking spot 

* Method: PUT

* URL:/api/parking_spots/:parkingId

```json
{
    "airport_parking_id":"1",
    "spot_number":"N111",
    "spot_size":"Large",
    "is_reserved":"No"
}
```
* Successful Response:
```json
{
    "airport_parking_id": 4,
    "id": 8,
    "is_reserved": "No",
    "spot_number": "N111",
    "spot_size": "Large",
    "user_id": 3
}
```
##
### Add an aircraft to the database

* Method: POST

* URL:/api/aircrafts/new

```json
{
    "plane_image":"https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.43.03%E2%80%AFPM.png",
    "tail_number":"N123GS",
    "manufacturer":"Beechcraft Bonanza",
    "model":"V-tailed Bonanza",
    "max_takeoff_weight":"3,805",
    "seating_capacity":"4",
    "operation_status":"Maintenance",
    "fuel_type":"100ll AvGas",
    "active_owners":"2",
    "notes":"2nd owner flies in the AM",
    "last_time_fueled":"2024-04-20"
}

```
* Successful Response:
```json
{
    "id":11,
    "user_id":4,
    "plane_image":"https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.43.03%E2%80%AFPM.png",
    "tail_number":"N123GS",
    "manufacturer":"Beechcraft Bonanza",
    "model":"V-tailed Bonanza",
    "max_takeoff_weight":"3,805",
    "seating_capacity":"4",
    "operation_status":"Maintenance",
    "fuel_type":"100ll AvGas",
    "active_owners":"2",
    "notes":"2nd owner flies in the AM",
    "last_time_fueled":"2024-04-20"
}

```
##

### Get an aircraft by id 

* Method: GET

* URL:/api/aircrafts/:aircraftId

```json
{
    "active_owners": "1",
    "fuel_type": "Jet A",
    "id": 4,
    "last_time_fueled": "2024-06-28 01:29:15.947058+00:00",
    "manufacturer": "Gulfstream",
    "max_takeoff_weight": "99000",
    "model": "G650",
    "notes": "No longer in service.",
    "operation_status": "Decommissioned",
    "parking_spot_id": null,
    "plane_image": "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.47.51%E2%80%AFPM.png",
    "seating_capacity": "18",
    "tail_number": "D4-98765",
    "user_id": 4
}
```
##

### Update an aircraft

* Method: PUT

* URL:/api/aircrafts/new

```json
{
    "active_owners": "1",
    "fuel_type": "Jet A",
    "id": 4,
    "last_time_fueled": "2024-06-28 01:29:15.947058+00:00",
    "manufacturer": "Gulfstream",
    "max_takeoff_weight": "99000",
    "model": "G650",
    "notes": "No longer in service.",
    "operation_status": "Decommissioned",
    "parking_spot_id": null,
    "plane_image": "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.47.51%E2%80%AFPM.png",
    "seating_capacity": "18",
    "tail_number": "N4-98765",
    "user_id": 4
}

```
* Successful Response:
```json
{
    "active_owners": "1",
    "fuel_type": "Jet A",
    "id": 4,
    "last_time_fueled": "2024-06-28 01:29:15.947058+00:00",
    "manufacturer": "Gulfstream",
    "max_takeoff_weight": "99000",
    "model": "G650",
    "notes": "No longer in service.",
    "operation_status": "Decommissioned",
    "parking_spot_id": null,
    "plane_image": "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.47.51%E2%80%AFPM.png",
    "seating_capacity": "18",
    "tail_number": "N4-98765",
    "user_id": 4
}
```
##

### Get all aircrafts

* Method: GET

* URL:/api/aircrafts/all

```json
{
    "aircrafts": [
        {
            "active_owners": "3",
            "fuel_type": "Jet A",
            "id": 1,
            "last_time_fueled": "2024-06-28 01:29:15.947043+00:00",
            "manufacturer": "Boeing",
            "max_takeoff_weight": "80000",
            "model": "737",
            "notes": "Recently serviced and ready for flight.",
            "operation_status": "Operational",
            "parking_spot_id": 11,
            "plane_image": "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.43.03%E2%80%AFPM.png",
            "seating_capacity": "180",
            "tail_number": "A1-12345",
            "user_id": 1
        },
        {
            "active_owners": "2",
            "fuel_type": "100ll AvGas",
            "id": 2,
            "last_time_fueled": "2024-06-28 01:29:15.947048+00:00",
            "manufacturer": "Airbus",
            "max_takeoff_weight": "75000",
            "model": "A320",
            "notes": "Undergoing routine maintenance.",
            "operation_status": "Maintenance",
            "parking_spot_id": null,
            "plane_image": "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-04-25+at+7.07.18%E2%80%AFPM.png",
            "seating_capacity": "160",
            "tail_number": "B2-67890",
            "user_id": 2
        },
        {
            "active_owners": "1",
            "fuel_type": "94 unleaded",
            "id": 3,
            "last_time_fueled": "2024-06-28 01:29:15.947056+00:00",
            "manufacturer": "Cessna",
            "max_takeoff_weight": "1100",
            "model": "172",
            "notes": "Used for training flights.",
            "operation_status": "Operational",
            "parking_spot_id": null,
            "plane_image": "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.42.40%E2%80%AFPM.png",
            "seating_capacity": "4",
            "tail_number": "C3-54321",
            "user_id": 3
        },
        {
            "active_owners": "1",
            "fuel_type": "Jet A",
            "id": 4,
            "last_time_fueled": "2024-06-28 01:29:15.947058+00:00",
            "manufacturer": "Gulfstream",
            "max_takeoff_weight": "99000",
            "model": "G650",
            "notes": "No longer in service.",
            "operation_status": "Decommissioned",
            "parking_spot_id": null,
            "plane_image": "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.47.51%E2%80%AFPM.png",
            "seating_capacity": "18",
            "tail_number": "N4-98765",
            "user_id": 4
        },
        {
            "active_owners": "2",
            "fuel_type": "100ll AvGas",
            "id": 5,
            "last_time_fueled": "2024-06-28 01:29:15.947063+00:00",
            "manufacturer": "Bombardier",
            "max_takeoff_weight": "67000",
            "model": "CRJ700",
            "notes": "Used for regional flights.",
            "operation_status": "Operational",
            "parking_spot_id": 5,
            "plane_image": "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.51.59%E2%80%AFPM.png",
            "seating_capacity": "78",
            "tail_number": "E5-11223",
            "user_id": 1
        },
        {
            "active_owners": "1",
            "fuel_type": "94 unleaded",
            "id": 6,
            "last_time_fueled": "2024-06-28 01:29:15.947064+00:00",
            "manufacturer": "Embraer",
            "max_takeoff_weight": "57000",
            "model": "E190",
            "notes": "Currently on standby.",
            "operation_status": "Operational",
            "parking_spot_id": 6,
            "plane_image": "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-06+at+4.55.06%E2%80%AFPM.png",
            "seating_capacity": "100",
            "tail_number": "F6-33445",
            "user_id": 2
        },
        {
            "active_owners": "3",
            "fuel_type": "Jet A",
            "id": 7,
            "last_time_fueled": "2024-06-28 01:29:15.947065+00:00",
            "manufacturer": "Dassault",
            "max_takeoff_weight": "70000",
            "model": "Falcon 7X",
            "notes": "Scheduled for avionics upgrade.",
            "operation_status": "Maintenance",
            "parking_spot_id": null,
            "plane_image": "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.43.03%E2%80%AFPM.png",
            "seating_capacity": "14",
            "tail_number": "G7-55667",
            "user_id": 3
        },
        {
            "active_owners": "1",
            "fuel_type": "100 unleaded",
            "id": 8,
            "last_time_fueled": "2024-06-28 01:29:15.947066+00:00",
            "manufacturer": "Piper",
            "max_takeoff_weight": "2400",
            "model": "PA-28",
            "notes": "Perfect condition for private use.",
            "operation_status": "Operational",
            "parking_spot_id": 8,
            "plane_image": "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-04-25+at+7.07.18%E2%80%AFPM.png",
            "seating_capacity": "4",
            "tail_number": "H8-77889",
            "user_id": 4
        },
        {
            "active_owners": "2",
            "fuel_type": "Jet A",
            "id": 9,
            "last_time_fueled": "2024-06-16",
            "manufacturer": "Beechcraft",
            "max_takeoff_weight": "15000",
            "model": "King Air 350",
            "notes": "Ideal for business travel.",
            "operation_status": "Operational",
            "parking_spot_id": 9,
            "plane_image": "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.42.40%E2%80%AFPM.png",
            "seating_capacity": "11",
            "tail_number": "I9-99001",
            "user_id": 1
        },
        {
            "active_owners": "1",
            "fuel_type": "100ll AvGas",
            "id": 10,
            "last_time_fueled": "2024-06-28 01:29:15.947067+00:00",
            "manufacturer": "Mooney",
            "max_takeoff_weight": "3000",
            "model": "M20",
            "notes": "Recently overhauled engine.",
            "operation_status": "Operational",
            "parking_spot_id": null,
            "plane_image": "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.47.51%E2%80%AFPM.png",
            "seating_capacity": "4",
            "tail_number": "J0-12312",
            "user_id": 2
        }
    ]
}
```
##

### Delete Aircraft

* Method: DELETE

* URL:/api/aircrafts/:aircraftId

```json
{
    "message": "Successfully deleted aircraft"
}
```
##

### Add an owner to the aircraft

* Method: POST

* URL:/api/owners/:aircraft_id/new/owner/to_aircraft

```json
{
    "firstname":"Raul",
    "lastname":"Moe",
    "username":"rm1234",
    "email":"rm@gmail.com",
    "address":"123 st blvd",
    "phone_number":"123-456-7890",
    "payment_type":"Debit Card",
    "notes":"Howdy yall"
}
```
* Successful Response:
```json
{
    "address": "123 st blvd",
    "aircraft_id": 2,
    "created_by_user_id": 4,
    "email": "rm@gmail.com",
    "firstname": "Raul",
    "id": 10,
    "lastname": "Moe",
    "notes": "Howdy yall",
    "payment_type": "Debit Card",
    "phone_number": "123-456-7890",
    "username": "rm1234"
}
```
##

### Display owners that correspond to a certain aircraft

* Method: GET

* URL:/api/aircrafts/:aircraftId

```json
{
    "owners": [
        {
            "address": "456 Elm St",
            "aircraft_id": 2,
            "created_by_user_id": 2,
            "email": "janesmith@example.com",
            "firstname": "Jane",
            "id": 2,
            "lastname": "Smith",
            "notes": "Frequent flyer",
            "payment_type": "PayPal",
            "phone_number": "2345678901",
            "username": "janesmith"
        },
        {
            "address": "123 st blvd",
            "aircraft_id": 2,
            "created_by_user_id": 4,
            "email": "rm@gmail.com",
            "firstname": "Raul",
            "id": 10,
            "lastname": "Moe",
            "notes": "Howdy yall",
            "payment_type": "Debit Card",
            "phone_number": "123-456-7890",
            "username": "rm1234"
        }
    ]
}
```
##

### Update an owner

* Method: PUT

* URL:/api/owners/:aircraft_id/owner/:owner_id

```json
{
    "firstname":"Raul",
    "lastname":"Moe",
    "username":"rm1234",
    "email":"rm@gmail.com",
    "address":"123 st blvd",
    "phone_number":"123-456-7890",
    "payment_type":"Debit Card",
    "notes":"Howdy yall"
}
```
* Successful Response:
```json
{
    "address": "123 st blvd",
    "aircraft_id": 2,
    "created_by_user_id": 4,
    "email": "rm@gmail.com",
    "firstname": "Raul",
    "id": 10,
    "lastname": "Moe",
    "notes": "This guy is so coooll he tips very welllll",
    "payment_type": "Cash",
    "phone_number": "000-000-0000",
    "username": "rm1234"
}
```
##

### Delete Owner

* Method: DELETE

* URL:/api/owners/:id/owner/:owner_id

```json
{
    "message": "Successfully deleted aircraft"
}
```
##
