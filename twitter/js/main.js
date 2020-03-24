window.onload = function () {
    let profile = document.getElementById("left-menu-profile");
    profile.addEventListener("click", showProfile);

    let home = document.getElementById("left-menu-home");
    home.addEventListener("click", showHome);
};

const showProfile = function showProfile() {
    let home = document.getElementById("home");
    let profile = document.getElementById("profile");
    home.style.display = "none";
    profile.style.display = "flex";

    loadUserData();
    loadTweets();
};

const showHome = function showHome() {
    let home = document.getElementById("home");
    let profile = document.getElementById("profile");
    home.style.display = "flex";
    profile.style.display = "none";

    cleanTweets()
};

const loadUserData = function() {
    let coverImage = document.querySelector("#profile .info .info-top .cover");
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

const loadTweets = function() {
    let feed = document.querySelector("#profile .feed");
    let tweetTemplate = document.querySelector("#profile .feed .tweet-template");

    tweets.tweets.forEach(tweet => {
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

const cleanTweets = function() {
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

let tweets = {
    "tweets": [
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
    ]
};