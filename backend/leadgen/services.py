from leadgen_server import settings
from .serializers import (
    UserSerializer,
    UsageSerializer,
    OrganizationDataSerializer,
    LeadsDataSerializer,
)
from .models import User, Usage, OrganizationData, LeadsData
from utils.utils import create_random_password
import jwt


def login_user_service(email, password):
    user = User.objects.get(email=email)
    if user.check_password(password):
        token = jwt.encode(
            {
                "user_id": str(user.id),
                "name": user.name,
                "email": user.email,
                "user_role": user.user_role,
            },
            settings.SECRET_KEY,
            algorithm="HS256",
        )
        return token
    else:
        raise Exception("Email or password incorrect!")


def get_user_service(user_id):
    user = User.objects.get(id=user_id)
    return UserSerializer(user).data


def get_all_users_service():
    users = User.objects.all()
    return UserSerializer(users, many=True).data


def add_user_service(name, email, role):
    password = "12345678"
    user = User(name=name, email=email, password=password, user_role=role)
    user.set_password(user.password)
    user.save()
    return UserSerializer(user).data


def edit_user_service(id, data):
    User.objects.filter(id=id).update(**data)


def delete_user_service(id):
    User.objects.get(id=id).delete()


def search_orgs_service(data, user_id):
    if data["employee_size_from"] and data["employee_size_to"]:
        if (
            data["employee_size_from"] > data["employee_size_to"]
            or type(data["employee_size_from"]) != int
            or type(data["employee_size_to"]) != int
        ):
            raise Exception("Employee range is not appropriate!")
        else:
            employee_range = f'{data["employee_size_from"]}-{data["employee_size_to"]}'
    else:
        employee_range = "N/A"

    data["employee_range"] = [employee_range]
    Usage.objects.create(
        industries=data["industries"],
        locations=data["locations"],
        employee_range=employee_range,
        user_id=user_id,
        keyword="organization",
        status="In Progress",
    )

    task = {
        "api_key": settings.APOLLO_KEY,
        "page": 1,
        "per_page": 100,
        "organization_num_employees_ranges": data["employee_range"],
        "organization_locations": data["locations"],
        "q_organization_keyword_tags": data["industries"],
    }
    task_data = {key: value for key, value in task.items() if task[key] is not None}
    print(task_data)


def get_usage_data_service(keyword, user_id):
    if keyword == "organization":
        usages = Usage.objects.filter(user_id=user_id, keyword="organization")
    else:
        usages = Usage.objects.filter(user_id=user_id, keyword="leads")
    return UsageSerializer(usages, many=True).data


def get_result_data_service(keyword, id):
    if keyword == "organization":
        org_results = OrganizationData.objects.filter(usage_id=id)
        return OrganizationDataSerializer(org_results, many=True).data
    else:
        leads_result = LeadsData.objects.filter(usage_id=id)
        return LeadsDataSerializer(leads_result, many=True).data
