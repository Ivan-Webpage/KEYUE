async function getLiff(liffID, backURL) {
    await liff.init({
        liffId: liffID,
    }).then(async function () {
        // 這邊開始寫使用其他功能
        if (liff.isLoggedIn()) { // 判斷是否有登入line
            // 取得使用者各種資料
            // const context = liff.getContext();
            // profile = await liff.getProfile()

        } else {
            alert('請先登入Line進行驗證喔！')
            liff.login({
                redirectUri: backURL // 使用者登入後要去到哪個頁面
            });
        }
    }).catch(function (error) {
        console.log("掛掉了: " + error);
    });

};

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
function sendFlexMessages_order(arrive_time, totalKM, totalTime, money, carStyle, start_Station, stop_Station, end_Station, timestamp, orderid) {
    try {
        var station = [];
        if (arrive_time.getFullYear() == '1900') {
            arrive_time = "現在"
        } else {
            arrive_time = arrive_time.getFullYear() + '/' + (arrive_time.getMonth() + 1) + '/' + (arrive_time.getDate()) + ' ' + arrive_time.getHours() + ':' + arrive_time.getMinutes();
        }
        station.push({ // 預約時間
            "type": "box",
            "layout": "baseline",
            "contents": [
                {
                    "type": "icon",
                    "url": "https://imgur.com/1Nhpqcj.png"
                },
                {
                    "type": "text",
                    "text": "預約時間",
                    "weight": "bold",
                    "margin": "sm",
                    "flex": 0,
                    "size": "sm"
                },
                {
                    "type": "text",
                    "text": arrive_time,
                    "size": "sm",
                    "align": "end",
                    "color": "#aaaaaa"
                }
            ]
        })
        station.push({ // 放費用
            "type": "box",
            "layout": "baseline",
            "contents": [
                {
                    "type": "icon",
                    "url": "https://imgur.com/1Nhpqcj.png"
                },
                {
                    "type": "text",
                    "text": "費用",
                    "weight": "bold",
                    "margin": "sm",
                    "flex": 0,
                    "size": "sm"
                },
                {
                    "type": "text",
                    "text": money + "元",
                    "size": "sm",
                    "align": "end",
                    "color": "#aaaaaa"
                }
            ]
        })
        station.push({ //放車種
            "type": "box",
            "layout": "baseline",
            "contents": [
                {
                    "type": "icon",
                    "url": "https://imgur.com/1Nhpqcj.png"
                },
                {
                    "type": "text",
                    "text": "車種",
                    "weight": "bold",
                    "margin": "sm",
                    "flex": 0,
                    "size": "sm"
                },
                {
                    "type": "text",
                    "text": carStyle,
                    "size": "sm",
                    "align": "end",
                    "color": "#aaaaaa"
                }
            ]
        })
        station.push({ // 放上車地點
            "type": "box",
            "layout": "baseline",
            "contents": [
                {
                    "type": "icon",
                    "url": "https://imgur.com/1Nhpqcj.png"
                },
                {
                    "type": "text",
                    "text": "上車",
                    "weight": "bold",
                    "margin": "sm",
                    "flex": 0,
                    "size": "sm"
                },
                {
                    "type": "text",
                    "text": start_Station,
                    "size": "xxs",
                    "align": "end",
                    "color": "#aaaaaa"
                }
            ]
        })

        if (stop_Station.length > 0) {
            for (var loc in stop_Station) {
                if (stop_Station[loc][0] != '') {
                    station.push({ // 放中途停靠站
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                            {
                                "type": "icon",
                                "url": "https://imgur.com/1Nhpqcj.png"
                            },
                            {
                                "type": "text",
                                "text": "停靠" + (loc + 1),
                                "weight": "bold",
                                "margin": "sm",
                                "flex": 0,
                                "size": "sm"
                            },
                            {
                                "type": "text",
                                "text": stop_Station[loc][0],
                                "size": "xxs",
                                "align": "end",
                                "color": "#aaaaaa"
                            }
                        ]
                    })
                }
            }
        }

        station.push({ // 放下車地點
            "type": "box",
            "layout": "baseline",
            "contents": [
                {
                    "type": "icon",
                    "url": "https://imgur.com/1Nhpqcj.png"
                },
                {
                    "type": "text",
                    "text": "下車",
                    "weight": "bold",
                    "margin": "sm",
                    "flex": 0,
                    "size": "sm"
                },
                {
                    "type": "text",
                    "text": end_Station,
                    "size": "xxs",
                    "align": "end",
                    "color": "#aaaaaa"
                }
            ]
        })

        liff.sendMessages([
            {
                type: 'text',
                text: '成功叫車，訂單編號：'+orderid
            },
            {
                "type": "flex",
                "altText": "自動叫車",
                "contents": {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "url": "https://imgur.com/ySHFdcA.png",
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "md",
                        "contents": [
                            {
                                "type": "text",
                                "text": "我叫的車",
                                "size": "xl",
                                "weight": "bold"
                            },
                            {
                                "type": "text",
                                "text": totalKM + "公里　" + totalTime + "分鐘",
                                "wrap": true,
                                "color": "#aaaaaa",
                                "size": "xxs"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "spacing": "sm",
                                "contents": station
                            },
                            {
                                "type": "text",
                                "text": timestamp,
                                "wrap": true,
                                "color": "#aaaaaa",
                                "size": "xxs"
                            }
                        ]
                    },
                    "footer": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "button",
                                "style": "primary",
                                "color": "#5d82bb",
                                "margin": "xxl",
                                "action": {
                                    "type": "uri",
                                    "label": "查看訂單狀態",
                                    "uri": "https://liff.line.me/1657826069-8DjJbz1m?order=" + orderid
                                }
                            },
                            {
                                "type": "button",
                                "style": "link",
                                "color": "#5d82bb",
                                "margin": "none",
                                "action": {
                                    "type": "uri",
                                    "label": "取消訂單",
                                    "uri": "https://liff.line.me/1657826069-yVdwr8Ab?order=" + orderid
                                }
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