let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');


const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('all-cards');
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filtered-section')

function calculateCount() {
    total.innerText = allCardSection.children.length //8
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length
}

calculateCount();

function toggleStyle(id) {

    // adding gray bg for all
    allFilterBtn.classList.add('bg-white','text-black')
    interviewFilterBtn.classList.add('bg-white','text-black')
    rejectedFilterBtn.classList.add('bg-white','text-black')

    // if any button has black then remove
    allFilterBtn.classList.remove('bg-blue-700','text-white')
    interviewFilterBtn.classList.remove('bg-blue-700','text-white')
    rejectedFilterBtn.classList.remove('bg-blue-700','text-white')

    const selected = document.getElementById(id)
    currentStatus = id
    console.log(currentStatus)

    selected.classList.remove('bg-white','text-black')
    selected.classList.add('bg-blue-700','text-white')

    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderThriving()
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
    } else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderStruggling()
    }

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

        parentNode.querySelector('.status').innerText = 'interview'

        const cardInfo = {
            companyName,
            jobRole,
            details,
            status: 'interview',
            description
        }

        const jobExist = interviewList.find(item => item.companyName == cardInfo.companyName)


        if (!jobExist) {
            interviewList.push(cardInfo)
        }

        if (currentStatus == 'interview-filter-btn') {
            renderStruggling()
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

        parentNode.querySelector('.status').innerText = 'rejected'

        const cardInfo = {
            companyName,
            jobRole,
            details,
            status: 'rejected',
            description
        }

        const jobExist = rejectedList.find(item => item.companyName == cardInfo.companyName)


        if (!jobExist) {
            rejectedList.push(cardInfo)
        }

        if (currentStatus == 'rejected-filter-btn') {
            renderStruggling()
        }

        calculateCount()

    }
})


function renderThriving() {
    filterSection.innerHTML = ''

    for (let interview of interviewList) {
        console.log(interview);

        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
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
                        <p class="status bg-[#EEF4FF] text-black p-3 w-35 rounded-xl">${interview.status}</p>
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

function renderStruggling(){

    filterSection.innerHTML = ''

    for(let rejected of rejectedList){

                console.log(rejected);

        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
    <div class="space-y-6">
                    <!-- part1 -->
                    <div>
                        <h1 class="companyName text-2xl font-semibold">${rejected.companyName}</h1>
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
                        <p class="status bg-[#EEF4FF] text-black p-3 w-35 rounded-xl">${rejected.status}</p>
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