// 獲取全部人員資料
Mock.mock('/user/userInfo', 'get', [
    { "s_sn": "35", "cnname": "邱小甘", "enname": "Peter", "sex": "0", "phone": "0945632158", "email": "aa@123.com" },
    { "s_sn": "49", "cnname": "蔡凡昕", "enname": "Allen", "sex": "0", "phone": "0945741587", "email": "bb@123.com" },
    { "s_sn": "50", "cnname": "趙雪瑜", "enname": "Sharon", "sex": "0", "phone": "0945486221", "email": "cc@123.com" },
    { "s_sn": "51", "cnname": "賴佳蓉", "enname": "Yoki", "sex": "1", "phone": "0945755002", "email": "dd@123.com" }
])

// 新增人員資料
Mock.mock('/user/userInfo', 'post', [
    { "s_sn": "35", "cnname": "邱小甘", "enname": "Peter", "sex": "0", "phone": "0945632158", "email": "aa@123.com" },
    { "s_sn": "49", "cnname": "蔡凡昕", "enname": "Allen", "sex": "0", "phone": "0945741587", "email": "bb@123.com" },
    { "s_sn": "50", "cnname": "趙雪瑜", "enname": "Sharon", "sex": "0", "phone": "0945486221", "email": "cc@123.com" },
    { "s_sn": "51", "cnname": "賴佳蓉", "enname": "Yoki", "sex": "1", "phone": "0945755002", "email": "dd@123.com" },
    { "s_sn": "52", "cnname": "新增帳號", "enname": "NewAccount", "sex": "1", "phone": "0945784124", "email": "ee@123.com" }
])

// 搜尋人員資料
Mock.mock('/user/userInfo/searchdata?cnname=123&enname=123', 'get', [
    { "s_sn": "35", "cnname": "邱小甘", "enname": "Peter", "sex": "0", "phone": "0945632158", "email": "aa@123.com" }
])

// 更新人員資料
Mock.mock('/user/userInfo', 'put', [
    { "s_sn": "49", "cnname": "蔡凡昕", "enname": "Allen", "sex": "0", "phone": "0945741587", "email": "bb@123.com" }
])

// 刪除人員資料
Mock.mock('/user/userInfo', 'delete', [
    { "s_sn": "35", "cnname": "邱小甘", "enname": "Peter", "sex": "0", "phone": "0945632158", "email": "aa@123.com" },
    { "s_sn": "49", "cnname": "蔡凡昕", "enname": "Allen", "sex": "0", "phone": "0945741587", "email": "bb@123.com" }
])