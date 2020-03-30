window.onload = () => {
    let profileElement = document.getElementById("left-menu-profile");
    profileElement.addEventListener("click", showProfile);

    let homeElement = document.getElementById("left-menu-home");
    homeElement.addEventListener("click", showHome);

    let startEditProfileElement = document.getElementById("start-edit-profile");
    startEditProfileElement.addEventListener("click", startEditProfile);

    let saveEditProfileElement = document.getElementById("save-edit-profile");
    saveEditProfileElement.addEventListener("click", saveEditProfile);

    let closeEditProfileElement = document.getElementById("close-edit-profile");
    closeEditProfileElement.addEventListener("click", closeEditProfile);

    let nameTextArea = document.querySelector("#edit-profile .form #edit-profile-item-name .textarea");
    let nameCounter = document.querySelector("#edit-profile .form #edit-profile-item-name .counter");
    nameTextArea.addEventListener("keyup", () => nameCounter.innerHTML = nameTextArea.value.length + "/50");

    let tagTextArea = document.querySelector("#edit-profile .form #edit-profile-item-tag .textarea");
    let tagCounter = document.querySelector("#edit-profile .form #edit-profile-item-tag .counter");
    tagTextArea.addEventListener("keyup", () => tagCounter.innerHTML = tagTextArea.value.length + "/50");
};

const showProfile = () => {
    let home = document.getElementById("home");
    let profile = document.getElementById("profile");
    home.style.display = "none";
    profile.style.display = "flex";

    loadUserData();
    loadTweets();
};

const showHome = ()  => {
    let home = document.getElementById("home");
    let profile = document.getElementById("profile");
    home.style.display = "flex";
    profile.style.display = "none";

    cleanTweets()
};

const startEditProfile = () => {
    let nameTextArea = document.querySelector("#edit-profile .form #edit-profile-item-name .textarea");
    nameTextArea.innerHTML = userData.name;
    let tagTextArea = document.querySelector("#edit-profile .form #edit-profile-item-tag .textarea");
    tagTextArea.innerHTML = userData.tag;

    let nameCounter = document.querySelector("#edit-profile .form #edit-profile-item-name .counter");
    nameCounter.innerHTML = userData.name.length + "/50";
    let tagCounter = document.querySelector("#edit-profile .form #edit-profile-item-tag .counter");
    tagCounter.innerHTML = userData.tag.length + "/50";

    let editProfileOverlay = document.getElementById("edit-profile-overlay");
    editProfileOverlay.style.display = "flex";
};

const saveEditProfile = ()  => {
    let nameTextArea = document.querySelector("#edit-profile .form #edit-profile-item-name .textarea");
    userData.name = nameTextArea.value;
    let tag = document.querySelector("#edit-profile .form #edit-profile-item-tag .textarea");
    userData.tag = tag.value;

    loadUserData();

    let editProfileOverlay = document.getElementById("edit-profile-overlay");
    editProfileOverlay.style.display = "none";
};

const closeEditProfile = ()  => {
    let nameTextArea = document.querySelector("#edit-profile .form #edit-profile-item-name .textarea");
    nameTextArea.innerHTML = "";
    let tag = document.querySelector("#edit-profile .form #edit-profile-item-tag .textarea");
    tag.innerHTML = "";

    let editProfileOverlay = document.getElementById("edit-profile-overlay");
    editProfileOverlay.style.display = "none";
};

const loadUserData = () => {
    let coverImage = document.querySelector("#profile .info .info-cover .cover");
    coverImage.setAttribute("src", userData.cover);

    let profileImage = document.querySelector("#profile .info .info-profile .profile");
    profileImage.setAttribute("src", userData.profile);

    let name = document.querySelector("#profile .info .bio .name");
    name.innerHTML = userData.name;

    let tag = document.querySelector("#profile .info .bio .tag");
    tag.innerHTML = userData.tag;

    let joinedDate = document.querySelector("#profile .info .bio .joined-date");
    joinedDate.innerHTML = userData.joinedDate;

    let following = document.querySelector("#profile .info .bio #following .count");
    following.innerHTML = userData.following;

    let followers = document.querySelector("#profile .info .bio #followers .count");
    followers.innerHTML = userData.followers;
};

const loadTweets = () => {
    let feed = document.querySelector("#profile .feed");
    let tweetTemplate = document.querySelector("#profile .feed .tweet-template");

    tweets.forEach(tweet => {
            let clone = tweetTemplate.content.cloneNode(true);

            let profileImage = document.querySelector(".tweet .profile");
            profileImage.setAttribute("src", tweet.profile);

            let author = document.querySelector(".tweet .body .author");
            author.innerHTML = tweet.author;

            let text = document.querySelector(".tweet .body .text");
            text.innerHTML = tweet.text;

        feed.appendChild(clone)
        }
    );
};

const cleanTweets = () => {
    let feed = document.querySelector("#profile .feed");
    let tweets = Array.from(feed.getElementsByClassName("tweet"));
    console.log(tweets);
    tweets.forEach(tweet => feed.removeChild(tweet));
};

let userData = {
    "cover": "assets/profile/cover.jpg",
    "profile": "assets/profile.jpg",
    "name": "Erez Bizo",
    "tag": "@BizoErez",
    "joinedDate": "March 2020",
    "following": 34,
    "followers": 1
};

let tweets = [
    {
        "profile": "assets/profile.jpg",
        "author": "Erez Bizo",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        "profile": "assets/profile.jpg",
        "author": "Erez Bizo",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        "profile": "assets/profile.jpg",
        "author": "Erez Bizo",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];