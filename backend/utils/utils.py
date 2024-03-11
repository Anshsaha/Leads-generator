from django.http import JsonResponse
import random
import string


def custom_response(
    success=False, message="something went wrong", data=None, status=400
):
    response = {"success": success, "message": message, "data": data}
    return JsonResponse(response, status=status)


def create_random_password() -> str:
    return "".join(random.choices(string.ascii_uppercase, k=8))
