# Troubleshooting Guide

## Account Not Registered Error

Most "Account Not Registered" errors can be resolved with one of two methods:

1. Double-checking your Polygon address. Please connect to PolyAztec using the Polygon address you used to sign up for your alias.

2. Mistyping or misremembering your alias. Remember that your alias is critical to access your account and forgetting or misplacing it means you may not be able to access your funds.

###

## Hung on "Connecting to Rollup Provider" on sign-up or log-in

If you see "Connecting to Rollup Provider" for more than 60 seconds, please troubleshoot using the below steps.

You may also be presented with an "AbortError: Transaction Aborted" when attempted to sign up or log-in after a system update.

In either case, navigate to your browser console (F12 or Alt-Cmd-J) and the Application tab on the top bar. Once there, click "Storage" under the "Application" group and click "Clear site data". Refresh the page.

![image](/img/troubleshoot-clear-site-data.png)

### Firefox

If you are using Firefox, open the browser console (F12 or right click and select Inspect). Go to the Storage tab on the top bar. Select the Indexed DB tab, select https://polyaztec.xyz and right click "hummus" and delete it. Refresh the page.

![image](/img/troubleshoot-firefox.png)

## Known issue: Deposited funds not showing in PolyAztec wallet balance

Step 1: [Clear site data](#hung-on-connecting-to-rollup-provider-on-sign-up-or-log-in)

Step 2: Login to https://polyaztec.xyz/balance, wait till the dashboard has loaded.

Step 3: Open Developer tool (F12). Select all levels in the console including Verbose.

![verbose](https://user-images.githubusercontent.com/4763902/184890333-a23068ae-d181-4038-8e28-f07b3e0f132d.png)

Step 4: Right click anywhere in the logs and “Save as…” to download the file.

![2022-08-16 21_00_06-zk money](https://user-images.githubusercontent.com/4763902/184889636-d2f84bfe-0dd1-4005-8573-c54f4b6a6d02.png)

Step 5: Send us a message on [Twitter](https://twitter.com/poly_aztec). 

## Frequently Asked Questions

Check the [Frequently Asked Questions page](/how-polyaztec-works/faq) to see if your problem is addressed there.

If it isn't, send us a message on [Twitter](https://twitter.com/poly_aztec).
