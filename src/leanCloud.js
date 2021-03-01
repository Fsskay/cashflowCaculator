import React from 'react';
import AV from 'leancloud-storage'


const { Query, User } = AV;
const AV = require('leancloud-storage');
const { Query, User } = AV;
console.log('leancloud4')

AV.init({
    appId: "anvFOSCAcw8uabSAV3MLguJR-gzGzoHsz",
    appKey: "BouSMxXI8TfGtCprQOyszbf9",
    serverURL: "https://please-replace-with-your-customized.domain.com"
});
console.log('leancloud3')

const TestObject = AV.Object.extend('TestObject');
const testObject = new TestObject();
console.log('leancloud2')

testObject.set('words', 'Hello world!');
console.log('leancloud1')
testObject.save().then((testObject) => {
    console.log('保存成功。')
})

export default AV