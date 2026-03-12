from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto('http://localhost:5173/personal')
        page.wait_for_timeout(5000)
        page.screenshot(path='/home/jules/verification/personal.png')
        print("Success! Screenshot saved.")
        browser.close()

verify()
