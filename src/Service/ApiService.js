class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL || 'http://13.124.72.117:10001'
    }

    async CommandProcessRequset(userId, therapyCategory, speech) {
        const url = `${'http://13.124.72.117:10001'}/command`
        const payload = {
            userId: userId,
            therapyCategory: therapyCategory,
            speech: speech,
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
        } catch (e) {
            console.log(e)
        }
    }

}



// const CommandProcessRequset = async (userId, therapyCategory, speech) => {
//     const url = `${'http://13.124.72.117:10001'}/command`
//     const payload = {
//         userId: userId,
//         therapyCategory: therapyCategory,
//         speech: speech,
//     }
//     try {
//         await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//         })


//     } catch (e) {
//         console.log(e)
//     }
// }

// useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const result = await CommandProcessRequset('user100', 'STRESS', 'SPEECH_COMMAND');
//             console.log('Received result:', result);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     fetchData();
// }, [])