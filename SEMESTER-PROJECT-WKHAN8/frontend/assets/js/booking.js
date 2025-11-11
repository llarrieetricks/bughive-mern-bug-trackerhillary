document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookingForm");
    const preview = document.getElementById("bookingPreview");
    const previewContent = document.getElementById("previewContent");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll(".error").forEach(el => el.textContent = "");

        let valid = true;

        // Name validation (letters and spaces only)
        const name = form.name.value.trim();
        if(!/^[a-zA-Z\s]+$/.test(name)) {
            document.getElementById("nameError").textContent = "Please enter a valid name (letters only).";
            valid = false;
        }

        // Email validation (must end with @uh.edu)
        const email = form.email.value.trim();
        if(!/^[^\s@]+@uh\.edu$/.test(email)) {
            document.getElementById("emailError").textContent = "Email must end with @uh.edu";
            valid = false;
        }

        // Date validation (cannot be in the past)
        const date = new Date(form.date.value);
        const today = new Date();
        today.setHours(0,0,0,0);
        if(date < today) {
            document.getElementById("dateError").textContent = "Date cannot be in the past.";
            valid = false;
        }

        // Start & End Time validation
        const startTime = form.startTime.value;
        const endTime = form.endTime.value;
        if(startTime >= endTime) {
            document.getElementById("endTimeError").textContent = "End time must be after start time.";
            valid = false;
        }

        // Room selection validation
        const room = form.room.value;
        if(room === "") {
            document.getElementById("roomError").textContent = "Please select a room.";
            valid = false;
        }

        // Purpose validation
        const purpose = form.purpose.value.trim();
        if(purpose === "") {
            document.getElementById("purposeError").textContent = "Purpose cannot be empty.";
            valid = false;
        }

        // Attendees validation (1–100)
        const attendees = parseInt(form.attendees.value, 10);
        if(isNaN(attendees) || attendees < 1 || attendees > 100) {
            document.getElementById("attendeesError").textContent = "Attendees must be between 1 and 100.";
            valid = false;
        }

        // If valid, show preview
        if(valid) {
            previewContent.innerHTML = `
                <strong>Name:</strong> ${name}<br>
                <strong>Email:</strong> ${email}<br>
                <strong>Date:</strong> ${form.date.value}<br>
                <strong>Time:</strong> ${startTime} - ${endTime}<br>
                <strong>Room:</strong> ${room}<br>
                <strong>Purpose:</strong> ${purpose}<br>
                <strong>Attendees:</strong> ${attendees}
            `;
            preview.hidden = false;
            form.reset();
        } else {
            preview.hidden = true;
        }
    });
});
