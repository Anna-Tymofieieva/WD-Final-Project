const doctors = {
    family : [
        {name: "Dr.John Doe", hours: "9:00 - 17:00", phone: "+49-555-1234", email: "dr.doe@gmail.com", address: "123 Main St."},
        {name: "Dr.Sahar Connor", hours: "10:00 - 18:00", phone: "+49-555-5678", email: "dr.connor@gmail.com", address: "146 Elm St."}
    ],
    ophthalmologist: [
        {name: "Dr.Jane Smith", hours: "8:00 - 16:00", phone: "+49-555-1111", email: "dr.smith@gmail.com", address: "5d Plum St."},
        {name: "Dr.Emma Brawn", hours: "9:00 - 17:00", phone: "+49-555-8911", email: "dr.brawn@ogmail.com", address: "27/29 Alt Pl."}
    ],
    cardiologist: [
        {name: "Dr.David Clark", hours: "10:00 - 16:00", phone: "+49-555-3232", email: "dr.clark@gmail.com", address: "312 Main St."}
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

document.addEventListener("DOMContentLoaded", function() {
    const appointmentDate = document.getElementById("appointmentDate");

    fetch('holidays.json')
        .then(response => response.json())
        .then(data => {
            const holidays = data.map(dateStr => new Date(dateStr));
        
            function isUnavailableDate(date) {
                const day = date.getDay();
                const isWeekend = day === 6 || day === 0; // 6 - Saturday, 0 - Sunday
                const isHoliday = holidays.some(holiday => holiday.getTime() === date.getTime());
                return isWeekend || isHoliday;
            }

            appointmentDate.addEventListener("change", function() {
                const selectedDate = new Date(this.value);
                if (isUnavailableDate(selectedDate)) {
                    alert("This day is a day off! Please choose another date that is not a Saturday/Sunday or a public holiday!");
                    this.value = ""; 
                }
            });
        })
        .catch(error => console.error('Error loading list of holidays:', error));
});


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
    const profile = document.getElementById('profileSelect').value;
    const doctorName = document.getElementById('doctorSelect').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;
    const patientName = document.getElementById('patientName').value;

    const selectedDoctor = doctors[profile].find(doctor => doctor.name === doctorName);

    const confirmationDetails = document.getElementById('confirmationDetails');
    confirmationDetails.innerHTML = `
        <p><strong>Doctor's Name:</strong> ${selectedDoctor.name}</p>
        <p><strong>Profession:</strong> ${profile}</p>
        <p><strong>Appointment Date:</strong> ${appointmentDate}</p>
        <p><strong>Appointment Time:</strong> ${appointmentTime}</p>
        <p><strong>Patient's Name:</strong> ${patientName}</p>
    `;

    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step4').style.display = 'none';
    document.getElementById('step5').style.display = 'block';
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



