from django.urls import path, include
from . import views

urlpatterns = [
    path("login/", views.UserLoginView.as_view()),
    path("get-user/<str:id>/", views.GetUserView.as_view()),
    path("get-all-users/", views.GetAllUserView.as_view()),
    path("add-user/", views.AddUserView.as_view()),
    path("edit-user/<str:id>/", views.EditUserView.as_view()),
    path("delete-user/<str:id>/", views.DeleteUserView.as_view()),
    path("search-organizations/", views.SearchOrgsView.as_view()),
]
