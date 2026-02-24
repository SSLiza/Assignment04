let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let total1 = document.getElementById('total1');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');


const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('all-cards');
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filtered-section')

function calculateCount() {

    const totalJobs = allCardSection.children.length;

    total.innerText = totalJobs;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (currentStatus === 'interview-filter-btn') {
        total1.innerText = `${interviewList.length} of ${totalJobs}`;
    }
    else if (currentStatus === 'rejected-filter-btn') {
        total1.innerText = `${rejectedList.length} of ${totalJobs}`;
    }
    else {
        total1.innerText = totalJobs;
    }
}

calculateCount();

function toggleStyle(id) {

    // adding gray bg for all
    allFilterBtn.classList.add('bg-white', 'text-black')
    interviewFilterBtn.classList.add('bg-white', 'text-black')
    rejectedFilterBtn.classList.add('bg-white', 'text-black')

    // if any button has black then remove
    allFilterBtn.classList.remove('bg-blue-700', 'text-white')
    interviewFilterBtn.classList.remove('bg-blue-700', 'text-white')
    rejectedFilterBtn.classList.remove('bg-blue-700', 'text-white')

    const selected = document.getElementById(id)
    currentStatus = id
    console.log(currentStatus)

    selected.classList.remove('bg-white', 'text-black')
    selected.classList.add('bg-blue-700', 'text-white')

    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderInterview()
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
    } else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderRejected()
    }

    calculateCount();

}

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.companyName').innerText;
        const jobRole = parentNode.querySelector('.jobRole').innerText;
        const details = parentNode.querySelector('.jobDetails').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const description = parentNode.querySelector('.description').innerText;

        // Now you can use these variables to update your counters or filters
        console.log(`Updating status for ${companyName}: ${status}`);

        parentNode.querySelector('.status').innerText = 'Interview'

        parentNode.querySelector('.status').classList.remove('bg-[#EEF4FF]', 'text-black');
        parentNode.querySelector('.status').classList.add('bg-green-100', 'font-semibold', 'text-xl');

        const cardInfo = {
            companyName,
            jobRole,
            details,
            status: 'Interview',
            description
        }

        const jobExist = interviewList.find(item => item.companyName == cardInfo.companyName)


        if (!jobExist) {
            interviewList.push(cardInfo)
        }

        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName)

        if (currentStatus == 'rejected-filter-btn') {
            renderRejected()
        }

        calculateCount()
    } else if (event.target.classList.contains('rejected-btn')) {

        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.companyName').innerText;
        const jobRole = parentNode.querySelector('.jobRole').innerText;
        const details = parentNode.querySelector('.jobDetails').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const description = parentNode.querySelector('.description').innerText;

        // Now you can use these variables to update your counters or filters
        console.log(`Updating status for ${companyName}: ${status}`);

        parentNode.querySelector('.status').innerText = 'Rejected'

        parentNode.querySelector('.status').classList.remove('bg-[#EEF4FF]', 'text-black');
        parentNode.querySelector('.status').classList.add('bg-green-100', 'font-semibold', 'text-xl');

        const cardInfo = {
            companyName,
            jobRole,
            details,
            status: 'Rejected',
            description
        }

        const jobExist = rejectedList.find(item => item.companyName == cardInfo.companyName)


        if (!jobExist) {
            rejectedList.push(cardInfo)
        }

        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName)

        if (currentStatus == 'interview-filter-btn') {
            renderInterview()
        }

        calculateCount()

    } else if (event.target.closest('.btn-delete')) {

        const parentNode = event.target.closest('.card');
        const companyName = parentNode.querySelector('.companyName').innerText;

        //Remove from interview list
        interviewList = interviewList.filter(item => item.companyName !== companyName);

        // Remove from rejected list
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        // Remove from ALL section also
        const allCards = allCardSection.querySelectorAll('.card');

        allCards.forEach(card => {
            const name = card.querySelector('.companyName').innerText;
            if (name === companyName) {
                card.remove();
            }
        });

        //Remove clicked card
        parentNode.remove();

        // Update count
        calculateCount();

        // Re-render if needed
        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        } else if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }
    }
})


function renderInterview() {
    filterSection.innerHTML = ''

    // If no interview jobs
    if (interviewList.length === 0) {
        filterSection.innerHTML = `
            <div class="text-center py-10">
                <img src="./assets/jobs.png" class="mx-auto w-40 mb-5" />
                <p class="text-gray-500 text-xl font-semibold">No Job Available</p>
            </div>
        `
        return;
    }


    for (let interview of interviewList) {
        console.log(interview);

        let div = document.createElement('div');
        div.className = 'card flex justify-between gap-8 p-8 bg-white'
        div.innerHTML = `
    <div class="space-y-6">
                    <!-- part1 -->
                    <div>
                        <h1 class="companyName text-2xl font-semibold">${interview.companyName}</h1>
                    <p class="jobRole text-gray-500">React Native Developer</p>
                    
                    </div>
                    <div>
                        <p class="jobDetails text-gray-500">Remote
                        •
                        Full-time
                        •
                        $130,000 - $175,000</p>
                    </div>
                    <!-- status part -->
                    <div class="status">
                        <p class="status bg-[#EEF4FF] text-black p-3 w-35 rounded-xl font-bold">${interview.status}</p>
                    </div>
                    <!-- part3 -->
                    <div>
                        <p class="description text-gray-500">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
                    </div>
                    <!-- button part -->
                     <div class="flex gap-5 ">
                        <button class="interview-btn px-4 py-1.5 text-sm font-semibold tracking-wide uppercase border rounded-md border-emerald-500 text-emerald-500 bg-white">Interview</button>
                        <button class="rejected-btn px-4 py-1.5 text-sm font-semibold tracking-wide uppercase border rounded-md border-rose-400 text-rose-400 bg-white">REJECTED</button>
                     </div>
                     
                      
                </div>
                <!-- delete part -->
                <div>
                    <button class="btn-delete border border-gray-500 rounded-full p-3"><img src="./assets/Trash.png" alt=""></button>
                </div>
    `
        filterSection.appendChild(div)
    }
}

function renderRejected() {

    filterSection.innerHTML = ''


    // If no rejected jobs
    if (rejectedList.length === 0) {
        filterSection.innerHTML = `
            <div class="text-center py-10">
                <img src="./assets/jobs.png" class="mx-auto w-40 mb-5" />
                <p class="text-gray-500 text-xl font-semibold">No Job Available</p>
            </div>
        `
        return;
    }


    for (let rejected of rejectedList) {

        console.log(rejected);

        let div = document.createElement('div');
        div.className = 'card flex justify-between gap-8 p-8 bg-white'
        div.innerHTML = `

        <div class="card flex justify-between bg-white rounded-xl p-6">
                    <div class="space-y-6">
                        <!-- part1 -->
                        <div>
                            <h1 class="companyName text-2xl font-semibold">${rejected.companyName}</h1>
                            <p class="jobRole text-gray-500">${rejected.jobRole}</p>

                        </div>
                        <div>
                            <p class="jobDetails text-gray-500">${rejected.details}</p>
                        </div>
                        <!-- status part -->
                        <div>
                            <p class="status bg-[#EEF4FF] text-[#002C5C] p-3 w-35 rounded-xl">${rejected.status}</p>
                        </div>
                        <!-- part3 -->
                        <div>
                            <p class="description text-gray-500">${rejected.description}</p>
                        </div>
                        <!-- button part -->
                        <div class="flex gap-5 ">
                            <button
                                class="interview-btn px-4 py-1.5 text-sm font-semibold tracking-wide uppercase border rounded-md border-emerald-500 text-emerald-500 bg-white">Interview</button>
                            <button
                                class="rejected-btn px-4 py-1.5 text-sm font-semibold tracking-wide uppercase border rounded-md border-rose-400 text-rose-400 bg-white">REJECTED</button>
                        </div>


                    </div>
                    <!-- delete part -->
                    <div class="flex items-start">
                        <button class="btn-delete border border-gray-500 rounded-full p-3 shrink-0 mr-2"><img src="./assets/Trash.png"
                                alt=""></button>
                    </div>
                </div>

    `
        filterSection.appendChild(div)
    }


}