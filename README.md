# ToDo
- On webim.html check, if cookie exists:
    - If not exists, show "Authenticate throw VK" button, which leads to authentication process that saves access token to cookie
    - If exists, use token to display user's name and profile photo via users.get?fields=photo_max API method. Also use friends.get method to select 5 random friends and show their names and photos too
