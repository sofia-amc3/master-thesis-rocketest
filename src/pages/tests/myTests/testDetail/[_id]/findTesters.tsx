import React, { useEffect, useState } from "react";
import Head from "next/head";
import TestsTopMenu from "@/components/tests-components/TestsTopMenu";
import Breadcrumbs from "@/components/Breadcrumbs";
import TextInput from "@/components/input-components/TextInput";
import TestersSearch from "@/components/find-testers-components/TestersSearch";
import TestersCheckboxCard from "@/components/find-testers-components/TesterCheckboxCard";
import {
  FindTestersResponse,
  FoundUsers,
} from "@/pages/api/tests/myTests/testDetail/findTestersUxResearcher";
import Button from "@/components/Button";
import PagesSlider from "@/components/PagesSlider";
import { useRouter } from "next/router";
import styles from "@/styles/app.module.css";
import axios from "axios";
import Loading from "@/components/Loading";
import { PropsTestPage } from "@/pages/tests";
import TesterInfo from "@/components/find-testers-components/TesterInfo";
import { digitalSavvinessText } from ".";
import { ContactedUserData } from "@/pages/api/tests/myTests/testDetail/contactUsersUxResearcher";

const FindTesters = (props: PropsTestPage) => {
  const router = useRouter();
  const { _id } = router.query; // access the test ID from the URL parameter
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({} as FindTestersResponse);
  const [foundUsers, setFoundUsers] = useState([] as FoundUsers[]);
  const [showUsers, setShowUsers] = useState(false);

  const [searchFieldValue, setSearchFieldValue] = useState("Rocketest");
  const [textMessage, setTextMessage] = useState("");

  // Pages' Slider
  const testerCardsPerPage = 10; // limit number of tester cards per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Testers to Display
  const startIndex = (currentPage - 1) * testerCardsPerPage;
  const endIndex = startIndex + testerCardsPerPage;
  const testersToDisplay = foundUsers.slice(startIndex, endIndex);

  // Handle previous and next page navigations
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goBack = () => {
    router.back();
  };

  const findTestersHandler = async (reload = false) => {
    const params = {
      userId: props.auth?.id,
      testId: _id,
    };

    await axios
      .get("/api/tests/myTests/testDetail/findTestersUxResearcher", { params })
      .then(async (res) => {
        setPageData(res.data);
        setTotalPages(
          Math.ceil(res.data.foundUsers.length / testerCardsPerPage)
        ); // defines total nr of pages in pages' slider after getting the testers
        setLoading(false);

        //if this function was called after contacting the users it will update the list
        reload && setFoundUsers(res.data.foundUsers);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data); // specific error messages
        } else {
          alert(error.message); // default error message
        }
        router.push("/tests/myTests/");
      });
  };
  useEffect(() => {
    setLoading(true);
    if (router.isReady) {
      findTestersHandler();
    }
  }, [router]);

  const buildDigiSavText = () => {
    let digiSavText = [];

    pageData.criteriaDigiSav.length > 0
      ? pageData.criteriaDigiSav.map((digiSav, key) => {
          digiSavText.push(digitalSavvinessText[digiSav]);
        })
      : digiSavText.push("Not Defined");

    return digiSavText.toString();
  };

  const searchButtonHandler = () => {
    if (searchFieldValue === "Rocketest") {
      setFoundUsers(pageData.foundUsers);
    } else if (
      searchFieldValue === "Custom API 01 (Simulating Facebook Users)"
    ) {
    } else if (
      searchFieldValue === "Custom API 02 (Simulating LinkedIn Users)"
    ) {
    }
    setShowUsers(true);
  };

  const selectUserHandler = (user: FoundUsers, selected: boolean) => {
    const tempFoundUsers = [...foundUsers];
    tempFoundUsers[foundUsers.indexOf(user)].selected = selected;
    setFoundUsers(tempFoundUsers);
  };

  const selectAllUsersHandler = (selected: boolean) => {
    const tempFoundUsers = [...foundUsers];

    tempFoundUsers.map((user, key) => {
      if (!user.wasContacted) {
        tempFoundUsers[key].selected = selected;
      }
    });

    setFoundUsers(tempFoundUsers);
  };

  const areAllUsersSelected = () => {
    let tempFoundUsers = [...foundUsers];
    let areAllUsersContacted = true;
    tempFoundUsers = tempFoundUsers.filter((user) => !user.wasContacted);

    tempFoundUsers.map((user, key) => {
      if (!user.selected) {
        areAllUsersContacted = false;
      }
    });
    return areAllUsersContacted;
  };

  const sendMessageHandler = async () => {
    const selectedUsers = foundUsers.filter((user) => user.selected);

    if (selectedUsers.length === 0) {
      return alert(
        `No testers were selected.\nPlease select at least one tester to be contacted.`
      );
    }

    //----------------------------- IF ROCKETEST

    if (textMessage === "") {
      return alert(`Message field cannot be empty.`);
    }

    //-------------- ELSE {localhost:5000/sendmessage?users=asdasd,adasd,asdasd&body=asdasdsxgfgdfgddsda}

    const params = {
      testId: _id,
      userData: [] as ContactedUserData[],
    };

    selectedUsers.forEach((user) => {
      params.userData.push({ platform: searchFieldValue, userId: user.userId });
    });

    await axios
      .post("/api/tests/myTests/testDetail/contactUsersUxResearcher", params)
      .then(async (res) => {
        alert(res.data); // SUCCESSFUL MESSAGE

        setLoading(true);
        findTestersHandler(true);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data); // specific error messages
        } else {
          alert(error.message); // default error message
        }
      });

    // verify if a message was provided
    // verify if users were selected
    // sucess = 1) alert saying that msg was sent, 2) update contacted users table
    // fail = alert w/ error: "Message field cannot be empty." / "No users were selected to send a message."
    // return alert(
    //   `Message sent successfully! \n\nNote: Because the 'Messages' page of Rocketest is not yet working, there is not the possibility of actually sending a message to the participants. This button only works for demonstration purposes of distinguishing between contacted users and not contacted users in our database.`
    // );
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <Head>
        <title>My Tests - Find Testers | Rocketest</title>
      </Head>
      <main className={styles.findTestersMain}>
        <TestsTopMenu />

        <Breadcrumbs link="/tests/myTests/" pageName="My Tests" imageAppears />
        <Breadcrumbs
          link={`/tests/myTests/testDetail/${_id}`}
          pageName={pageData.testName}
          imageAppears
        />
        <Breadcrumbs link="" pageName="Find Testers" activePage />

        <h1>{pageData.testName}</h1>
        <br />

        <span className={styles.labelSpan}>Test Criteria:</span>
        <br />

        <TesterInfo
          iconSrc="/icons/testerInfo-age.svg"
          info={pageData.criteriaAge.toString() || "Not Defined"}
          outsideCard
        />
        <TesterInfo
          iconSrc="/icons/testerInfo-gender.svg"
          info={pageData.criteriaGender || "Not Defined"}
          outsideCard
        />
        <TesterInfo
          iconSrc="/icons/profile-location.svg"
          info={pageData.criteriaLocation || "Not Defined"}
          outsideCard
        />
        <TesterInfo
          iconSrc="/icons/testerInfo-career.svg"
          info={pageData.criteriaCareers.toString() || "Not Defined"}
          outsideCard
        />
        <TesterInfo
          iconSrc="/icons/testerInfo-ds.svg"
          info={buildDigiSavText()}
          outsideCard
        />
        <TesterInfo
          iconSrc="/icons/testerInfo-hobbies.svg"
          info={pageData.criteriaHobbies.toString() || "Not Defined"}
          outsideCard
        />
        <br />
        <h6>
          Find testers that match the previously defined criteria for this test.
        </h6>
        <div className={styles.findTestersSearch}>
          <TextInput
            title="Select the Platform"
            placeholder=""
            size="small"
            isSelect
            defaultValue={searchFieldValue}
            options={[
              "Rocketest",
              "Custom API (Simulating Facebook Users)",
              "Custom API (Simulating LinkedIn Users)",
              "LinkedIn",
              "Facebook",
            ]}
            disableArray={["LinkedIn", "Facebook"]}
            onChange={(e) => {
              setSearchFieldValue(e.target.value);
              setFoundUsers([]);
            }}
          />
          <Button
            text="Search"
            size="small"
            type="tertiary"
            function={() => searchButtonHandler()}
          />
        </div>

        {showUsers ? (
          <>
            {/* Only appears after search */}
            <span className={styles.labelSpan}>
              We found the following results:
            </span>
            <TestersSearch
              selected={areAllUsersSelected()}
              onSelect={(e) => selectAllUsersHandler(e.target.checked)}
            />
            <div className={styles.testersResultsContainer}>
              {foundUsers.length > 0 ? (
                testersToDisplay.map((user, key) => (
                  <TestersCheckboxCard
                    key={key}
                    userName={user.userName}
                    userInfo={{
                      withinAge: user.withinAge,
                      age: user.userAge,
                      withinGender: user.withinGender,
                      gender: user.userGender,
                      withinLocation: user.withinLocation,
                      location: user.userLocation,
                      withinCareer: user.withinCareer,
                      career: user.userCareer,
                      withinHobbies: user.withinHobbies,
                      hobbies: user.sameHobbies,
                      withinDigiSav: user.withinDigiSav,
                      digitalSavviness: user.userDigiSav,
                    }}
                    wasContacted={user.wasContacted}
                    userImgSrc={user.userProfilePhoto}
                    selected={user.selected || false}
                    onSelect={(e) => selectUserHandler(user, e.target.checked)}
                  />
                ))
              ) : (
                <span>No testers found yet.</span>
              )}
            </div>
            <PagesSlider
              previousPageArrow={currentPage > 1}
              currentPageNr={currentPage}
              totalPagesNr={totalPages}
              nextPageArrow={totalPages > 1 && totalPages != currentPage}
              nextPageFunction={goToNextPage}
              previousPageFunction={goToPreviousPage}
            />
            <div className={styles.findTestersMsg}>
              <TextInput
                title="Send a message to the selected testers:"
                placeholder="e.g. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
                size="small"
                isTextarea
                defaultValue={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
              />
              <img
                src="/icons/test-information.svg"
                alt="Information Icon"
                title={`Ensure that the usability testing method is easily understood by the participants: they will have to register on Rocketest to respond to it. \n\nIf there is some kind of monetary incentive, it could be a good way to convince users to participate in this task. \n\nAnother important aspect to take into account is the confidentiality of the information present in the test, and, if necessary, you could provide a document for the participant to sign before taking the test.`}
                className={styles.infoIcon}
              />
              <Button
                text="Send Message"
                size="medium"
                type="tertiary"
                function={sendMessageHandler}
              />
            </div>
          </>
        ) : (
          <></>
        )}
        <Button
          text="Back"
          size="extra-large"
          type="secondary"
          function={goBack}
        />
      </main>
    </>
  );
};

export default FindTesters;
