import pytest
from app import db, app
from flask import json

@pytest.fixture
def client():
    application = app('testing')
    app.config['TESTING'] = True
    with application.test_client() as client:
        yield client

def test_hello(client):
    response = client.get('/hello')
    assert response.status_code == 200
    assert response.data == b'Hello, World!'