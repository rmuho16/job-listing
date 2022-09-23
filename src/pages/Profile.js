import Header from "../components/Header"
import React from "react";
import Favourites from "../components/Favourites";
import {Tab, Table, Tabs} from "react-bootstrap";
import AppliedJobs from "../components/AppliedJobs";
import {isJobSeeker, userEmail, userType} from "../services/auth";

const Profile = () => {
    return (
        <>
            <Header/>

            <div className='container'>
                <div className="mt-4">
                    <h2 className="mb-4">Profile information</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Email</th>
                            <th>User type</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{userEmail()}</td>
                            <td>{userType()}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
                { isJobSeeker() &&
                <Tabs
                    defaultActiveKey="Favourites"
                    id="uncontrolled-tab-example"
                    className="mb-3 mt-5">
                    <Tab eventKey="Favourites" className='color-theme fw-semibold' title="Favourites">
                        <div className="row card-deck">
                            <Favourites/>
                        </div>
                    </Tab>
                    <Tab eventKey="Applied" title="Applied">
                        <div className="row card-deck">
                            <AppliedJobs/>
                        </div>
                    </Tab>
                </Tabs> }
            </div>
        </>
    )
}

export default Profile