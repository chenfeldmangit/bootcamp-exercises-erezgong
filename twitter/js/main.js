const tweetsKey = "tweets";
const userDataKey = "userData";

window.onload = () => {
    localStorage.setItem(tweetsKey, JSON.stringify(initialTweets));
    localStorage.setItem(userDataKey, JSON.stringify(initialUserData));

    loadTweets("home");

    // left-menu:
    let profileElement = document.getElementById("left-menu-profile");
    profileElement.addEventListener("click", showProfile);

    let homeElement = document.getElementById("left-menu-home");
    homeElement.addEventListener("click", showHome);

    // edit-profile:
    let startEditProfileElement = document.getElementById("start-edit-profile");
    startEditProfileElement.addEventListener("click", startEditProfile);

    let saveEditProfileElement = document.getElementById("save-edit-profile");
    saveEditProfileElement.addEventListener("click", saveEditProfile);

    let closeEditProfileElement = document.getElementById("close-edit-profile");
    closeEditProfileElement.addEventListener("click", closeEditProfile);

    // textArea counter:
    let nameTextArea = document.querySelector("#edit-profile .form #edit-profile-item-name .textarea");
    let nameCounter = document.querySelector("#edit-profile .form #edit-profile-item-name .counter");
    nameTextArea.addEventListener("keyup", () => nameCounter.innerHTML = nameTextArea.value.length + "/50");

    let tagTextArea = document.querySelector("#edit-profile .form #edit-profile-item-tag .textarea");
    let tagCounter = document.querySelector("#edit-profile .form #edit-profile-item-tag .counter");
    tagTextArea.addEventListener("keyup", () => tagCounter.innerHTML = tagTextArea.value.length + "/50");

    // add-tweet:
    let tweetButton = document.querySelector("#home .status-container #add-tweet");
    tweetButton.addEventListener("click", addTweet);
};

const showProfile = () => {
    let home = document.getElementById("home");
    let profile = document.getElementById("profile");
    home.style.display = "none";
    profile.style.display = "flex";

    loadUserData();
    loadTweets("profile");
};

const showHome = () => {
    let home = document.getElementById("home");
    let profile = document.getElementById("profile");
    home.style.display = "flex";
    profile.style.display = "none";
};

const startEditProfile = () => {
    let userData = JSON.parse(localStorage.getItem(userDataKey));

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

const saveEditProfile = () => {
    let userData = JSON.parse(localStorage.getItem(userDataKey));

    let nameTextArea = document.querySelector("#edit-profile .form #edit-profile-item-name .textarea");
    userData.name = nameTextArea.value;
    let tag = document.querySelector("#edit-profile .form #edit-profile-item-tag .textarea");
    userData.tag = tag.value;

    loadUserData();

    let editProfileOverlay = document.getElementById("edit-profile-overlay");
    editProfileOverlay.style.display = "none";
};

const closeEditProfile = () => {
    let nameTextArea = document.querySelector("#edit-profile .form #edit-profile-item-name .textarea");
    nameTextArea.innerHTML = "";
    let tag = document.querySelector("#edit-profile .form #edit-profile-item-tag .textarea");
    tag.innerHTML = "";

    let editProfileOverlay = document.getElementById("edit-profile-overlay");
    editProfileOverlay.style.display = "none";
};

const loadUserData = () => {
    let userData = JSON.parse(localStorage.getItem(userDataKey));

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

const loadTweets = (mainWindow) => {
    let loading = document.getElementById("loading");
    loading.style.display = "block";

    TweetAPI.getTweets()
        .then(tweets => {
                let feed = document.querySelector("#" + mainWindow + " .feed");
                feed.innerHTML = "";

                tweets.forEach(tweet => {
                        let tweetTemplate = document.querySelector(".tweet-template");
                        let clone = tweetTemplate.content.cloneNode(true);

                        clone.firstElementChild.setAttribute("data-id", tweet.id);

                        let profileImage = clone.querySelector(".profile");
                        profileImage.setAttribute("src", tweet.profile);

                        let author = clone.querySelector(".author");
                        author.innerHTML = tweet.author;

                        let text = clone.querySelector(".text");
                        text.innerHTML = tweet.text;

                        let likeButton = clone.querySelector(".like-tweet-icon");
                        likeButton.addEventListener("click", likeTweet);

                        if (tweet.liked) {
                            let likeIcon = clone.querySelector(".like-tweet-icon .icon");
                            likeIcon.style.fill = "red";
                        }

                        loading.style.display = "none";
                        feed.appendChild(clone)
                    }
                )
            }
        ).catch(errorFunction);
};

const addTweet = () => {
    let tweetTextArea = document.querySelector("#home .status-container .status textarea");
    let tweet = {
        "profile": "assets/profile.jpg",
        "author": "Erez Bizo",
        "text": tweetTextArea.value,
        "liked": false
    };
    TweetAPI.addTweet(tweet)
        .then(() => {
            tweetTextArea.value = "";
            loadTweets("home");
        })
        .catch(errorFunction);
};

const likeTweet = event => {
    let tweetId = event.currentTarget.parentElement.parentElement.getAttribute("data-id");

    TweetAPI.likeTweet(tweetId)
        .then(() => {
            loadTweets("home");
        })
        .catch(errorFunction);
};

const errorFunction = error => console.log(error);

let initialUserData = {
    "cover": "assets/profile/cover.jpg",
    "profile": "assets/profile.jpg",
    "name": "Erez Bizo",
    "tag": "@BizoErez",
    "joinedDate": "March 2020",
    "following": 34,
    "followers": 1
};

let initialTweets = [
    {
        "id": 0,
        "profile": "assets/profile.jpg",
        "author": "Erez Bizo",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "liked": false
    },
    {
        "id": 1,
        "profile": "assets/profile.jpg",
        "author": "Erez Bizo",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "liked": false
    },
    {
        "id": 2,
        "profile": "assets/profile.jpg",
        "author": "Erez Bizo",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "liked": false
    }
];
