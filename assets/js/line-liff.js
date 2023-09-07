async function getLiff(liffID) {
    await liff.init({
        liffId: liffID,
    }).catch(function (error) {
        console.log("掛掉了: " + error);
    });

};
// 登入
async function login(backURL) {
    await liff.login({
        redirectUri: backURL // 使用者登入後要去到哪個頁面
    }).then(async function () {
        if (liff.isLoggedIn()) {
            // alert('您已經登入成功！')
            return true;
        } else {
            // alert('很抱歉！登入失敗')
            return false;
        }
    }).catch(function (error) {
        console.log("掛掉了: " + error);
        return false;
    });
}

// 關閉liff畫面
function turnOff() {
    liff.closeWindow();
}
// 檢查是否有登入
function checkLogin() {
    return liff.isLoggedIn();
}
async function getProfile(liffID) {
    return liff.getProfile();
}
function getSdkVersion() {
    return liff.getVersion();
}
function getLanguage() {
    return liff.getLanguage();
}
function getLineApp() {
    return liff.isInClient();
}
function getOs() {
    return liff.getOS();
}
function getLineVersion() {
    return liff.getLineVersion();
}
function getMail() {
    var user = liff.getDecodedIDToken();
    return user?.email;
}


// 使用者回傳文字
function sendTextMessages(word) {
    liff.sendMessages([
        {
            type: 'text',
            text: word
        }
    ])
}

// 使用者叫車_回傳選單
function sendFlexMessages_order(heroCover, roomID, roomName, startTime, endTime) {
    try {
        liff.sendMessages([
            {
                type: 'text',
                text: '恭喜您預訂場地成功！'
            },
            {
                "type": "flex",
                "altText": "預定場地",
                "contents": {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "url": heroCover,
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                        "action": {
                            "type": "uri",
                            "uri": "https://keyue.com.tw/appointment/"+roomID
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": roomName,
                                "weight": "bold",
                                "size": "xl"
                            },
                            {
                                "type": "separator"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "margin": "lg",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "地點",
                                                "color": "#aaaaaa",
                                                "size": "sm",
                                                "flex": 1
                                            },
                                            {
                                                "type": "text",
                                                "text": "台北市中山區興安街106號1樓",
                                                "wrap": true,
                                                "color": "#666666",
                                                "size": "sm",
                                                "flex": 5
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "開始",
                                                "color": "#aaaaaa",
                                                "size": "sm",
                                                "flex": 1
                                            },
                                            {
                                                "type": "text",
                                                "text": startTime,
                                                "wrap": true,
                                                "color": "#666666",
                                                "size": "sm",
                                                "flex": 5
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "結束",
                                                "color": "#aaaaaa",
                                                "size": "sm",
                                                "flex": 1
                                            },
                                            {
                                                "type": "text",
                                                "text": endTime,
                                                "wrap": true,
                                                "color": "#666666",
                                                "size": "sm",
                                                "flex": 5
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    "footer": {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "sm",
                        "contents": [
                            {
                                "type": "button",
                                "style": "secondary",
                                "height": "md",
                                "action": {
                                    "type": "uri",
                                    "label": "訂位修改",
                                    "uri": "https://keyue.com.tw/account?tabIndex=1"
                                },
                                "color": "#f4ca82"
                            }
                        ],
                        "flex": 0
                    }
                }
            }
        ])
    } catch (error) {
        alert(error)
    }
}

// 司機應徵_回傳選單
function sendFlexMessages_driver(name, idcard, drive_number, tel, plate_number, car_color, car_year, car_type, big_car, timestamp) {
    try {
        liff.sendMessages([
            {
                "type": "flex",
                "altText": "我要應徵司機-送出司機資料",
                "contents": {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                        "url": "https://imgur.com/ySHFdcA.png"
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "md",
                        "contents": [
                            {
                                "type": "text",
                                "text": "應徵司機資料",
                                "size": "xl",
                                "weight": "bold"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "contents": [
                                            {
                                                "type": "icon",
                                                "url": "https://imgur.com/1Nhpqcj.png"
                                            },
                                            {
                                                "type": "text",
                                                "text": "真實姓名",
                                                "weight": "bold",
                                                "margin": "sm",
                                                "flex": 0
                                            },
                                            {
                                                "type": "text",
                                                "text": name,
                                                "size": "sm",
                                                "align": "end",
                                                "color": "#aaaaaa"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "contents": [
                                            {
                                                "type": "icon",
                                                "url": "https://imgur.com/1Nhpqcj.png"
                                            },
                                            {
                                                "type": "text",
                                                "text": "身分證字號",
                                                "weight": "bold",
                                                "margin": "sm",
                                                "flex": 0
                                            },
                                            {
                                                "type": "text",
                                                "text": idcard,
                                                "size": "sm",
                                                "align": "end",
                                                "color": "#aaaaaa"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "contents": [
                                            {
                                                "type": "icon",
                                                "url": "https://imgur.com/1Nhpqcj.png"
                                            },
                                            {
                                                "type": "text",
                                                "text": "駕照號碼",
                                                "weight": "bold",
                                                "margin": "sm",
                                                "flex": 0
                                            },
                                            {
                                                "type": "text",
                                                "text": drive_number,
                                                "size": "sm",
                                                "align": "end",
                                                "color": "#aaaaaa"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "contents": [
                                            {
                                                "type": "icon",
                                                "url": "https://imgur.com/1Nhpqcj.png"
                                            },
                                            {
                                                "type": "text",
                                                "text": "連絡電話",
                                                "weight": "bold",
                                                "margin": "sm",
                                                "flex": 0
                                            },
                                            {
                                                "type": "text",
                                                "text": tel.toString(),
                                                "size": "sm",
                                                "align": "end",
                                                "color": "#aaaaaa"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "contents": [
                                            {
                                                "type": "icon",
                                                "url": "https://imgur.com/1Nhpqcj.png"
                                            },
                                            {
                                                "type": "text",
                                                "text": "車牌",
                                                "weight": "bold",
                                                "margin": "sm",
                                                "flex": 0
                                            },
                                            {
                                                "type": "text",
                                                "text": plate_number.toString(),
                                                "size": "sm",
                                                "align": "end",
                                                "color": "#aaaaaa"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "contents": [
                                            {
                                                "type": "icon",
                                                "url": "https://imgur.com/1Nhpqcj.png"
                                            },
                                            {
                                                "type": "text",
                                                "text": "車子顏色",
                                                "weight": "bold",
                                                "margin": "sm",
                                                "flex": 0
                                            },
                                            {
                                                "type": "text",
                                                "text": car_color,
                                                "size": "sm",
                                                "align": "end",
                                                "color": "#aaaaaa"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "contents": [
                                            {
                                                "type": "icon",
                                                "url": "https://imgur.com/1Nhpqcj.png"
                                            },
                                            {
                                                "type": "text",
                                                "text": "車出場的年份",
                                                "weight": "bold",
                                                "margin": "sm",
                                                "flex": 0
                                            },
                                            {
                                                "type": "text",
                                                "text": car_year.toString(),
                                                "size": "sm",
                                                "align": "end",
                                                "color": "#aaaaaa"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "contents": [
                                            {
                                                "type": "icon",
                                                "url": "https://imgur.com/1Nhpqcj.png"
                                            },
                                            {
                                                "type": "text",
                                                "text": "車的種類",
                                                "weight": "bold",
                                                "margin": "sm",
                                                "flex": 0
                                            },
                                            {
                                                "type": "text",
                                                "text": car_type,
                                                "size": "sm",
                                                "align": "end",
                                                "color": "#aaaaaa"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "contents": [
                                            {
                                                "type": "icon",
                                                "url": "https://imgur.com/1Nhpqcj.png"
                                            },
                                            {
                                                "type": "text",
                                                "text": "是否為大車",
                                                "weight": "bold",
                                                "margin": "sm",
                                                "flex": 0
                                            },
                                            {
                                                "type": "text",
                                                "text": big_car,
                                                "size": "sm",
                                                "align": "end",
                                                "color": "#aaaaaa"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "text",
                                "text": timestamp,
                                "wrap": true,
                                "color": "#aaaaaa",
                                "size": "xxs"
                            }
                        ]
                    }
                }

            }
        ])
    } catch (error) {
        alert(error)
    }
}