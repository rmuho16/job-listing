import {createSlice} from "@reduxjs/toolkit"
import initialState from './data'
import {
    crateJobListing,
    createApplication,
    createFavorite,
    deleteApplication, deleteFavorite,
    deleteJobListing,
    editJobListing
} from "../firebase";
import {userEmail} from "../services/auth";

export const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload
        },
        addJob: (state, action) => {
            state.jobs = [action.payload, ...state.jobs]

            crateJobListing(action.payload).then()
        },
        deleteJob: (state, action) => {
            for (let it in state.jobs) {
                if (state.jobs[it].id === action.payload.id) {

                    deleteJobListing(state.jobs[it].id).then(() => {
                    })
                    state.jobs = state.jobs.filter(job => job.id !== action.payload.id)
                    break
                }
            }
        },
        editJob: (state, action) => {
            state.jobEdit = {
                item: action.payload,
                edit: true
            }
        },
        updateJob: (state, action) => {
            state.jobs.map(job => {
                if (job.id === action.payload.id) {
                    job.company = action.payload.company
                    job.location = action.payload.location
                    // job.contract_time = action.payload.contract_time
                    job.category = action.payload.category
                    job.title = action.payload.title
                    job.description = action.payload.description
                }
            })
            state.jobEdit.edit = false

            editJobListing(action.payload).then(() => {
            })
        },
        setFavorites: (state, action) => {
            state.favouriteJobs = action.payload
        },
        addFavourite: (state, action) => {
            state.favouriteJobs = [action.payload, ...state.favouriteJobs]
            // eslint-disable-next-line array-callback-return
            state.jobs.find(job => {
                if (job.id === action.payload.id) {
                    return job.bookmarked = true
                }
            });

            createFavorite({
                email: userEmail(),
                id: action.payload.id,
                job: action.payload.job,
            }).then()
        },

        deleteFavourite: (state, action) => {
            state.favouriteJobs = state.favouriteJobs.filter(job => job.id !== action.payload.id)
            // eslint-disable-next-line array-callback-return
            state.jobs.find(job => {
                if (job.id === action.payload.id) {
                    return job.bookmarked = false
                }
            });

            deleteFavorite(action.payload.id).then()
        },
        setApplications: (state, action) => {
            state.appliedJobs = action.payload
        },
        addApplied: (state, action) => {
            state.appliedJobs = [action.payload, ...state.appliedJobs]
            // eslint-disable-next-line array-callback-return
            state.jobs.find(job => {
                if (job.id === action.payload.id) {
                    return job.applied = true
                }
            });

            createApplication({
                email: userEmail(),
                id: action.payload.id,
                job: action.payload.job,
            }).then()
        },

        deleteApplied: (state, action) => {
            state.appliedJobs = state.appliedJobs.filter(job => job.id !== action.payload.id)
            // eslint-disable-next-line array-callback-return
            state.jobs.find(job => {
                if (job.id === action.payload.id) {
                    return job.applied = false
                }
            });

            deleteApplication(action.payload.id).then()
        }
    }
})

export const {
    setJobs,
    setApplications,
    setFavorites,
    addJob,
    deleteJob,
    editJob,
    updateJob,
    deleteFavourite,
    addFavourite,
    addApplied,
    deleteApplied
} = jobsSlice.actions

export default jobsSlice.reducer