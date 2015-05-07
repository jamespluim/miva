miva
====

Smart Continue Shopping Link

1) Add an ID to your contine shopping link/button:<br />

2) Add the following Javascript to your scripts.js jsPROD and jsCTGY section
```javascript
createCookie('lastPage', window.location.href, 0);
```

2) Add the following Javascript to your scripts.js jsBASK section
```javascript
$('#continue-shopping-link').attr('href', readCookie('lastPage'));
```