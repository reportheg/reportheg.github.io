const to1 = 'kishanreddy.g@sansad.nic.in';
const to2 = 'hm.moca@nic.in';
const to3 = 'dgoffice.dgca@nic.in';
const cc1 = 'ss.samad@nic.in';
const cc2 = 'sdit.div-moca@gov.in';
const cc3 = 'taai@taai.in';
const cc4 = 'rajesh.dathik@happyeasygo.com';
const cc5 = 'cs@happyeasygo.com';
const bcc1 = 'reportheg@proton.me';
const subject = 'Fraudulent Operations of HappyEasyGo Pvt. Ltd.';
const tweetOptions = {
  option1: {
    message: '@happyeasygo is running a country-wide scam. No refunds on cancellations, Unreachable customer support and an astounding number of customers complaining on twitter.\n@MoCA_GoI\n@DGCAIndia\n@tourismgoi\n@JM_Scindia\n@TAAI1951\n@consumerforum_\n@kishanreddybjp\n#boycotthappyeasygo',
    html: '<span class="tweet-highlight">@happyeasygo</span> is running a country-wide scam. No refunds on cancellations, Unreachable customer support and an astounding number of customers complaining on twitter.</br><span class="tweet-highlight">@MoCA_GoI @DGCAIndia @tourismgoi @JM_Scindia @TAAI1951 @consumerforum_ @kishanreddybjp #boycotthappyeasygo</span>',
  },
  option2: {
    message: 'I was defrauded by @happyeasygo. They don\'t provide refunds on booking cancellations. No response to calls, emails or tweets. DGCA/Concerned Ministry, kindly take action\n@MoCA_GoI\n@DGCAIndia\n@tourismgoi\n@JM_Scindia\n@TAAI1951\n@consumerforum_\n@kishanreddybjp\n#boycotthappyeasygo',
    html: 'I was defrauded by <span class="tweet-highlight">@happyeasygo</span>. They don\'t provide refunds on booking cancellations. No response to calls, emails or tweets. DGCA/Concerned Ministry, kindly take action</br><span class="tweet-highlight">@MoCA_GoI @DGCAIndia @tourismgoi @JM_Scindia @TAAI1951 @consumerforum_ @kishanreddybjp #boycotthappyeasygo</span>',
  },
  option3: {
    message: '@happyeasygo is cheating hundreds of customers daily. They are stealing the refund money from booking cancellations and failed transactions. Shut them down immediately.\n@MoCA_GoI\n@DGCAIndia\n@tourismgoi\n@JM_Scindia\n@TAAI1951\n@consumerforum_\n@kishanreddybjp\n#boycotthappyeasygo',
    html: '<span class="tweet-highlight">@happyeasygo</span> is cheating hundreds of customers daily. They are stealing the refund money from booking cancellations and failed transactions. Shut them down immediately.</br><span class="tweet-highlight">@MoCA_GoI @DGCAIndia @tourismgoi @JM_Scindia @TAAI1951 @consumerforum_ @kishanreddybjp #boycotthappyeasygo</span>',
  },
  option4: {
    message: '@MoCA_GoI @DGCAIndia @tourismgoi @JM_Scindia @TAAI1951 @consumerforum_ @kishanreddybjp\nPlease investigate the operation of @happyeasygo. A simple search on twitter can expose their scam. The number of people they\'re cheating every day is appalling.\n#boycotthappyeasygo',
    html: '<span class="tweet-highlight">@MoCA_GoI @DGCAIndia @tourismgoi @JM_Scindia @TAAI1951 @consumerforum_ @kishanreddybjp</span></br>Please investigate the operation of <span class="tweet-highlight">@happyeasygo</span>. A simple search on twitter can expose their scam. The number of people they\'re cheating every day is appalling.</br><span class="tweet-highlight">#boycotthappyeasygo</span>',
  }
}
let senderName = '';
let senderEmail = '';
let tripId = '';
let body = '';
let isTweetAgreementSigned = false;
let isMailAgreementSigned = false;
let selectedTweet;

window.onload = () => {
  document.getElementById('mailSubject').textContent = ': ' + subject;
  Object.keys(tweetOptions).forEach((key, index) => {
    let tweetOptionElement = document.createElement('div');
    tweetOptionElement.className = "col fs-smallest p-3 m-2 bg-light rounded tweet-option";
    tweetOptionElement.innerHTML = tweetOptions[key].html;
    tweetOptionElement.addEventListener('click', (e) => loadTweet(tweetOptions[key], e.target));
    document.querySelector('.tweets-list').appendChild(tweetOptionElement);
    // document.querySelector('.tweets-list').children[index].innerHTML = tweetOptions[key].html;
    // document.querySelector('.tweets-list').children[index].addEventListener('click', (e) => loadTweet(tweetOptions[key], e.target));
  });
  updateBody();
}

document.getElementById('checkMailAgreement').addEventListener('change', (e) => {
  if (e.target.checked) {
    isMailAgreementSigned = true;
  } else {
    isMailAgreementSigned = false;
  }
  enableOrDisableSendEmailButton();
});

document.getElementById('checkTweetAgreement').addEventListener('change', (e) => {
  if (e.target.checked) {
    isTweetAgreementSigned = true;
  } else {
    isTweetAgreementSigned = false;
  }
  enableOrDisableTweetButton(selectedTweet);
});

document.getElementById('name').addEventListener('keyup', (e) => {
  senderName = e.target.value;
  enableOrDisableSendEmailButton();
  updateBody();
});

document.getElementById('email').addEventListener('keyup', (e) => {
  senderEmail = e.target.value;
  enableOrDisableSendEmailButton();
});

document.getElementById('tripId').addEventListener('keyup', (e) => {
  tripId = e.target.value;
  enableOrDisableSendEmailButton();
  updateBody();
});

document.querySelectorAll('.tncLink').forEach(element => {
  element.addEventListener('click', (e) => {
    document.getElementById('tncModal').style.display = 'block';
    document.getElementById('tncModal').setAttribute('role', 'dialog');
    document.getElementById('tncModal').classList.toggle('show');
    return e.preventDefault();
  });
});

function loadTweet(option, element) {
  document.getElementById('tweetBody').innerHTML = option.html;
  document.querySelectorAll('.tweet-option').forEach(e => e.classList.remove('selected'));
  element.classList.add('selected');
  selectedTweet = option;
  selectedTweet.element = element;
  document.querySelector('.fa-solid.fa-circle-xmark').style.visibility = 'visible';
  enableOrDisableTweetButton(selectedTweet);
}

function unloadTweet() {
  document.getElementById('tweetBody').innerHTML = 'Select a tweet from the options on top.';
  selectedTweet.element.classList.remove('selected');
  selectedTweet = undefined;
  document.querySelector('.fa-solid.fa-circle-xmark').style.visibility = 'hidden';
  enableOrDisableTweetButton(selectedTweet);
}

function tncModalClose() {
  document.getElementById('tncModal').style.display = 'none';
  document.getElementById('tncModal').removeAttribute('role');
  document.getElementById('tncModal').classList.toggle('show');
}

function enableOrDisableSendEmailButton() {
  if (sendMailValidation()) {
    document.getElementById('sendButton').setAttribute('onclick', `location.href='${generateMailtoLink()}'; return false;`);
    document.getElementById('sendButton').disabled = false;
  } else {
    document.getElementById('sendButton').removeAttribute('onclick');
    document.getElementById('sendButton').disabled = true;
  }
}

function enableOrDisableTweetButton(selectedTweet) {
  if (tweetValidation()) {
    document.getElementById('tweetButton').setAttribute('href', generateTweetLink(selectedTweet.message));
    document.getElementById('tweetButton').classList.remove('btn-disabled');
  } else {
    document.getElementById('tweetButton').removeAttribute('onclick');
    document.getElementById('tweetButton').classList.add('btn-disabled');
  }
}

function sendMailValidation() {
  return tripId.length && senderName.length && senderEmail.length && senderEmail.search('@') > -1 && isMailAgreementSigned;
}

function tweetValidation() {
  return selectedTweet && isTweetAgreementSigned;
}

function updateBody() {
  body = `Respected Minister of Tourism, Shri G. Kishan Reddy,\nMinister of Civil Aviation, Shri Jyotiraditya M. Scindia,\nDirector General of DGCA, Shri Arun Kumar and\nother concerned authorities in cc,\n\nI am writing to you out of deep distress over the fraudulent operations of the travel agency company, HappyEasyGo Pvt. Ltd. (\"HEG\"). I am one of many unfortunate customers, who are owed huge sums of money by them in refund for booking cancellations, refund for transaction failures etc. Customers are asked to wait for 30-45 days in order to process the refund. However, they don\'t do anything after that. They don\'t reply to queries via email and their customer care numbers are always unreachable. The number of people having similar issues with their service and taking it to twitter to complain is countless and growing since it's inception in 2017 but they clearly don\'t seem to be affected. Every day hundreds of people book tickets and hotels through their website. They continue to steal from every new customer.\nA company of such repute should not be allowed to operate. I kindly request and trust you to look into this and take necessary and immediate action against them and bring them to justice. I hope, after this, they return money to those they've stolen from and most importantly don\'t attempt to steal from anyone else in the future.\nI'm mentioning my booking Id below for the reference of officials from HEG tagged in CC, if by chance they plan to return my money.\n\nThanks and Regards,\n${senderName}\nBooking Id: ${tripId}`;
  document.getElementById('mailBody').textContent = body;
}

function generateMailtoLink() {
  let encodedSubject = encodeURIComponent(subject).replace(/'/g, '%27');
  let encodedBody = encodeURIComponent(body).replace(/'/g, '%27');
  return `mailto:${to1},${to2},${to3}?cc=${cc1},${cc2},${cc3},${cc4},${cc5}&bcc=${bcc1}&subject=${encodedSubject}&body=${encodedBody}`;
}

function generateTweetLink(tweet) {
  let encodedTweet = encodeURIComponent(tweet).replace(/'/g, '%27');
  return `https://twitter.com/intent/tweet?text=${encodedTweet}`;
}
