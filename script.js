const doctors = {
    family: [
        {name: "Dr.John Doe", hours: "9am - 5pm", phone: "+49-555-1234", email: "dr.doe@gmail.com", address: "123 Main St."},
        {name: "Dr.Sahar Connor", hours: "10am - 6pm", phone: "+49-555-5678", email: "dr.connor@gmail.com", address: "146 Elm St."}
    ],
    ophthalmologist: [
        {name: "Dr.Jane Smith", hours: "8am - 4pm", phone: "+49-555-1111", email: "dr.smith@gmail.com", address: "5d Plum St."},
        {name: "Dr.Emma Brawn", hours: "9am - 5pm", phone: "+49-555-8911", email: "dr.brawn@ogmail.com", address: "27/29 Alt Pl."}
    ],
    cardiologist: [
        {name: "Dr.David Clark", hours: "10am - 4pm", phone: "+49-555-3232", email: "dr.clark@gmail.com", address: "312 Main St."}
    ]
}


function loadDoctors() {
    const profile = document.getElementById('profileSelect').value;
    const doctorSelect = document.getElementById('doctorSelect');
    doctorSelect.innerHTML = '<option value = "">Select a Doctor</option';

    if (profile && doctors[profile]) {
        doctors[profile].forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.name;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
        });

        document.getElementById('step2').style.display = 'block';
        } else {
            document.getElementById('step2').style.display = 'none';
            document.getElementById('step3').style.display = 'none';
            document.getElementById('step4').style.display = 'none';
            document.getElementById('step5').style.display = 'none';
        }   
}

function showStep3() {
    const doctor = document.getElementById('doctorSelect').value;
    if (doctor) {
        document.getElementById('step3').style.display = 'block';
    } else {
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step4').style.display = 'none';
        document.getElementById('step5').style.display = 'none';
    }
}

function TimeSlots(workingHours) {
    const [start, end] = workingHours.split('-');
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    let currentHour = startHour;
    let currentMinute = startMinute;
    const timeSlots = [];

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
        const formattedTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
        timeSlots.push(formattedTime);

        currentMinute += 30;
        if (currentMinute >= 60) { 
            currentMinute -= 60;
            currentHour += 1;
        }

    }
    return timeSlots;
}
function showStep4() {
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;

    if (date && time) {
        document.getElementById('step4').style.display = 'block';
    } else {
        document.getElementById('step4').style.display = 'none';
        document.getElementById('step5').style.display = 'none';
    }
}

function checkPatientInfo() {
    const patientName = document.getElementById('patientName').value;
    const patientDob = document.getElementById('patientDob').values;
    const patientPhone = document.getElementById('patientPhone').value;
    const patientEmail = document.getElementById('patientEmail').value;

    const nextButton = document.getElementById('nextButton');
    if (patientName && patientDob && patientPhone && patientEmail) {
        nextButton.style.display = 'block';
    } else {
        nextButton.style.display = 'none';
    } 
}

function showConfirmationPage() {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step4').style.display = 'none';
    document.getElementById('step5').style.display = 'block';

    const confirmationDetails = document.getElementById('confirmationDetails');
    const doctor = document.getElementById('doctorSelect').value;
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const selectedDoctor = doctors[document.getElementById('profilSelect').value].find(d => d.name === doctor);

    const patientName = document.getElementById('patientName').value;
    const patientDob = document.getElementById('patientDob').value;
    const patientPhone = document.getElementById('patientPhone').value;
    const patientEmail = document.getElementById('patientEmail').value;

    confirmationDetails.innerHTML = `
        <ul>
            <li><strong>Doctor:</strong> ${selectedDoctor.name}</li>
            <li><storng>Profile:</strong> ${document.getElementById('profileSelect').opotion[document.getElementById('profileSelect').selectedIndex].text}</li>
        </ul>
    `;
}

function editAppointment() {
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'block';
    document.getElementById('step3').style.display = 'block';
    document.getElementById('step4').style.display = 'block';
    document.getElementById('step5').style.display = 'none';
}
            
function confirmAppointment() {
    alert('Appointment confirmed');
}

document.getElementById('patientName').addEventListener('input', checkPatientInfo);
document.getElementById('patientDob').addEventListener('input', checkPatientInfo);
document.getElementById('patientPhone').addEventListener('input', checkPatientInfo);
document.getElementById('patientEmail').addEventListener('input', checkPatientInfo);



