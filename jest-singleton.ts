import { testDataStore } from './src/config/data-source'


export const setupTestDB = async () => {
    try {
        await testDataStore.initialize()
        console.log(`Successfully started`)
    } catch (error) {
        console.log(`${error} occured`)
    }
}

export const teardownTestDB = async () =>{
    await testDataStore.destroy()
}