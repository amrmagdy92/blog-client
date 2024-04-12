let resultsPerPage = 10
let pageNumber = 1

if (document.readyState === "loading") {
    requestPosts()
}

// API Requests
function requestPosts() {
    const request = new XMLHttpRequest()
    let url = `https://blog-website-sgrv.onrender.com/api/v1/posts?resultsPerPage=${resultsPerPage}&pageNumber=${pageNumber}`
    request.open('GET', url)
    request.setRequestHeader('Content-Type', 'application/json')
    request.addEventListener('load', function() {
        if (request.status === 200 && request.readyState === 4) {
            document.getElementById("loading-spinner").classList.add("visually-hidden")
            document.getElementById("blog-posts-container").innerHTML = request.response
        } else {
            if (request.status == 400 && request.readyState === 4) {
                console.log(request.response)
                // TODO: Add proper error handlinghttp://127.0.0.1:5500
            }
        }
    })
    request.send()
}
function sendEmail() {
    let senderEmail = document.getElementById("sender-email").value
    let emailSubject = document.getElementById("email-subject").value
    let message = document.getElementById("sender-message").value
    
    const body = JSON.stringify({
        ticket: {
            sender: senderEmail,
            subject: emailSubject,
            message: message
        }
    })
    const request = new XMLHttpRequest()
    request.open('POST', "https://blog-website-sgrv.onrender.com/api/v1/contact")
    request.setRequestHeader('Content-Type', 'application/json')
    request.addEventListener('load', function(event) {
        // TODO: Add a spinner instead of the button's text
        if (request.status === 200 && request.readyState === 4) {
            console.log(request.response)
            if (request.response.msg === "Ticket has been created successfully") {
                // show a tick mark that sending was successfull
                // after a small delay dismiss the modal
            }
        } else {
            if (request.status == 400 && request.readyState === 4) {
                console.log(request.response)
                // TODO: Add proper error handling
            }
        }
    })
    request.send(body)
}

// Form Validations
function validateContactEmail() {
    let email = document.getElementById("sender-email").value
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRegex.test(email)) {
        document.getElementById("email-error").classList.add("visually-hidden")
    } else {
        document.getElementById("email-error").classList.remove("visually-hidden")
    }
}
function validateSubject() {
    let subject = document.getElementById("email-subject").value
    if (subject.length == 0) {
        document.getElementById("subject-error").classList.remove("visually-hidden")
    } else {
        document.getElementById("subject-error").classList.add("visually-hidden")
    }
}
function validateMessage() {
    let message = document.getElementById("sender-message").value
    if (message.length == 0) {
        document.getElementById("message-error").classList.remove("visually-hidden")
    } else {
        document.getElementById("message-error").classList.add("visually-hidden")
    }
}

// Clear contact us
function clearContactUs() {
    document.getElementById("sender-email").value = ""
    document.getElementById("email-subject").value = ""
    document.getElementById("sender-message").value = ""
    document.getElementById("email-error").classList.add("visually-hidden")
    document.getElementById("subject-error").classList.add("visually-hidden")
    document.getElementById("message-error").classList.add("visually-hidden")
}

// Event Listeners Registration
document.getElementById("sender-email").addEventListener("keyup", validateContactEmail)
document.getElementById("email-subject").addEventListener("keyup", validateSubject)
document.getElementById("sender-message").addEventListener("keyup", validateMessage)