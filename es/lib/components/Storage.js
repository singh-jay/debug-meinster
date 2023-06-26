import React, { useEffect, useState } from "react";
import Table from "./Table";
import Input from "./Input";
import Button from "./Button";
import plusIcon from "../../../icons/svg/plus.svg";
import minusIcon from "../../../icons/svg/minus.svg";
import trashIcon from "../../../icons/svg/trash.svg";
import copyIcon from "../../../icons/svg/copy.svg";
import Image from "next/image";
import Console from "./Console";
import CarrotIcon from "./CarrotIcon";
import { Network } from "./Network";
import axios from "axios";
const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts"
});
const dummyData = {
  data: {
    user: {
      id: "645b9e3f7ae96872ecd0ac19",
      name: "Jay Singh",
      email: "jaytestmay10@gmail.com",
      imageUrl: null,
      emailVerified: false,
      provider: "local",
      providerId: null,
      phoneNumber: "1100110111",
      countryCode: "+91",
      phoneVerified: true,
      lastAccessTime: 1683725887042,
      activeProfileId: "645b9e3f7ae96872ecd0ac1a",
      createdAt: 1683725887042,
      updatedAt: 1683725887044,
      lastSessionTime: 1683725887042,
      whatsappSubscription: true,
      whatsappSubscriptionModifiedAt: 1683725887042,
      whatsappSubscriptionSource: "web",
      app: null,
      active: true
    },
    profile: {
      id: "645b9e3f7ae96872ecd0ac1a",
      userId: "645b9e3f7ae96872ecd0ac19",
      skills: [{
        skillId: "5c8f9f6f302a1c6aa711c786",
        name: "Node.Js",
        primary: true
      }, {
        skillId: "5c8f9f6f302a1c6aa711c720",
        name: "Java",
        primary: false
      }],
      experienceYear: 1,
      experienceMonth: 0,
      latestCompanyDetails: {
        jobTitle: {
          name: "sde"
        },
        company: {
          id: "6311b58939202dd2bd427ce7",
          name: "Amazon"
        },
        location: {
          id: "5d83594329dfed31a76b463f",
          name: "Noida"
        },
        ctc: 12,
        noticePeriodId: "5c825be2892f1959148c79ff",
        startWorkingDate: 1652140800000,
        endWorkingDate: 1683676800000,
        noticePeriod: 0,
        noticePeriodData: {
          id: "5c825be2892f1959148c79ff",
          name: "0 days"
        },
        servingNoticePeriod: false,
        servingNoticePeriodUpdateDate: 1683788316498,
        noticePeriodUpdatedAt: 1683788316498,
        startUp: false,
        topProductCompany: true,
        workType: [{
          name: "Product"
        }],
        businessType: [{
          name: "B2B"
        }, {
          name: "B2C"
        }, {
          name: "IaaS"
        }, {
          name: "SaaS"
        }],
        presentCompany: false
      },
      latestEducationDetails: {
        course: {
          id: "5c8f96aa892f193ab68e325e",
          name: "B.Tech/BE"
        },
        college: {
          id: "5c8f96aa892f193ab68e329a",
          name: "Birla Institute of Technology (BIT), Ranchi"
        },
        yearOfPassing: "2012",
        collegeTier: "2"
      },
      preferences: {
        profilePrivacy: "public",
        profilePrivacyDescription: "Let companies view my full profile",
        locations: [],
        benefits: [],
        companyTypes: [],
        roleTypes: []
      },
      fileName: "resume-template.pdf",
      userType: "not-premium",
      cvPath: "https://jsdev.bigshyft.com/jsapi/cv/download?env=test&appId=105&formKey=F67jss1i3n5g8h&fileKey=Uab7e79fc5323840759904f6fbf09e43",
      formKey: "F67jss1i3n5g8h",
      fileKey: "Uab7e79fc5323840759904f6fbf09e43",
      jobSearchStatus: "NOT_OPEN_TO_OPPORTUNITIES",
      jobSearchStatusDesc: "Not open to opportunities",
      updatedAt: 1683788316508,
      resumeDetails: {},
      fieldMask: [],
      domain: {
        id: "5c8f9f6f302a1c6aa711c6a7",
        name: "Software Engineering"
      },
      specialization: {
        id: "5c8f9f6f302a1c6aa711c7ef",
        name: "Backend"
      },
      isUserProfileCompleted: true
    },
    moderationResult: {
      userState: null,
      screenName: null,
      message: null,
      reportUrl: null,
      interviewType: null,
      interviewDetails: null
    },
    counsellor: null
  },
  status: 200,
  info: {}
};
const parseCookies = () => {
  const parsedCookies = {};
  if (document.cookie) {
    const cookies = document.cookie.split("; ");
    cookies.forEach(cookie => {
      const [key, value] = cookie.split("=");
      parsedCookies[key] = value;
    });
  }
  return Object.entries(parsedCookies);
};
function arrayToJSON(arr) {
  return arr.reduce((obj, item) => {
    obj[item[0]] = item[1];
    return obj;
  }, {});
}
const RenderImage = ({
  src,
  width: _width = 22,
  height: _height = 22,
  alt: _alt = "image description",
  onClick
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "p-1.5 hover:bg-slate-200 rounded-md",
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }
  }, /*#__PURE__*/React.createElement(Image, {
    src: src,
    width: _width,
    height: _height,
    alt: _alt
  }));
};
const Storage = () => {
  const [localStorageItems, setLocalStorageItems] = useState(Object.entries(localStorage));
  const [sessionStorageItems, setSessionStorageItems] = useState(Object.entries(sessionStorage));
  const [cookieItems, setCookieItems] = useState(parseCookies());
  const [newLocalKey, setNewLocalKey] = useState("");
  const [newLocalValue, setNewLocalValue] = useState("");
  const [newSessionKey, setNewSessionKey] = useState("");
  const [newSessionValue, setNewSessionValue] = useState("");
  const [newCookieKey, setNewCookieKey] = useState("");
  const [newCookieValue, setNewCookieValue] = useState("");
  const [openSection, setOpenSection] = useState([true, false, false]);
  const [openAddItem, setOpenAddItem] = useState([false, false, false]);
  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/posts/1", {
    // 	method: "PUT",
    // 	body: JSON.stringify({
    // 		id: 1,
    // 		title: "foo",
    // 		body: "bar",
    // 		userId: 1,
    // 	}),
    // 	headers: {
    // 		"Content-type": "application/json; charset=UTF-8",
    // 	},
    // })
    // 	.then((response) => response.json())
    // 	.then((json) => console.log(json));

    client.post("", {
      title: "new title",
      body: "new body",
      userId: 1
    }).then(res => {
      console.log(res);
    }).catch(e => console.log("axios err", e));
  }, []);
  const handleAddItem = (storageType, _key, _value, extras = {}) => {
    const {
      isUpdateFlow = false,
      updateIndex,
      checkDuplicateKey = true,
      deleteKey
    } = extras;
    if (!_key || !_value) return;
    const storageItems = storageType === "localStorage" ? localStorageItems : sessionStorageItems;
    if (checkDuplicateKey && storageItems.some(([key]) => key === _key)) {
      return;
    }
    const updatedItems = [...storageItems];
    if (updateIndex !== undefined) {
      updatedItems[updateIndex] = [_key, _value];
    } else {
      updatedItems.push([_key, _value]);
    }
    if (storageType === "localStorage") {
      localStorage.setItem(_key, _value);
      if (deleteKey) localStorage.removeItem(deleteKey);
      setLocalStorageItems([...updatedItems]);
      if (!isUpdateFlow) {
        setNewLocalKey("");
        setNewLocalValue("");
        openAddItemHandler(0);
      }
    } else {
      sessionStorage.setItem(_key, _value);
      if (deleteKey) sessionStorage.removeItem(deleteKey);
      setSessionStorageItems([...updatedItems]);
      if (!isUpdateFlow) {
        setNewSessionKey("");
        setNewSessionValue("");
        openAddItemHandler(1);
      }
    }
  };
  const handleDeleteItem = (storageType, key) => {
    if (storageType === "localStorage") {
      localStorage.removeItem(key);
      setLocalStorageItems(localStorageItems.filter(([k]) => k !== key));
    } else {
      sessionStorage.removeItem(key);
      setSessionStorageItems(sessionStorageItems.filter(([k]) => k !== key));
    }
  };
  const handleClearAll = storageType => {
    if (storageType === "localStorage") {
      localStorage.clear();
      setLocalStorageItems([]);
    } else {
      sessionStorage.clear();
      setSessionStorageItems([]);
    }
  };

  // Handler for adding a new cookie
  const handleAddCookie = (_, _key, _value, extras = {}) => {
    const {
      isUpdateFlow = false,
      updateIndex,
      deleteKey
    } = extras;
    document.cookie = `${_key}=${_value}`;
    const updatedItems = [...cookieItems];
    if (updateIndex !== undefined) {
      updatedItems[updateIndex] = [_key, _value];
    } else {
      updatedItems.push([_key, _value]);
    }
    if (deleteKey) document.cookie = `${deleteKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    setCookieItems([...updatedItems]);
    if (!isUpdateFlow) {
      setNewCookieKey("");
      setNewCookieValue("");
      openAddItemHandler(2);
    }
  };

  // Handler for deleting a cookie
  const handleDeleteCookie = (_, key) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    setCookieItems(cookieItems.filter(([k]) => k !== key));
  };

  // Handler for clearing all cookies
  const handleClearAllCookies = () => {
    document.cookie.split(";").forEach(c => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    setCookieItems([]);
  };
  const openSectionHandler = (index, openState) => {
    if (openState !== openSection[index]) {
      setOpenSection(state => {
        const updatedState = [...state];
        updatedState[index] = openState;
        return updatedState;
      });
    }
  };
  const openAddItemHandler = index => {
    setOpenAddItem(state => {
      const updatedState = [...state];
      updatedState[index] = !state[index];
      return updatedState;
    });
  };
  const copyContent = async text => {
    const json = arrayToJSON(text);
    try {
      await navigator.clipboard.writeText(json);
      console.warn("text copied: ", text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 divide-y divide-neutral-300"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pb-4"
  }, /*#__PURE__*/React.createElement("details", {
    className: "group",
    open: openSection[0],
    onToggle: e => {
      openSectionHandler(0, e.target.open);
    }
  }, /*#__PURE__*/React.createElement("summary", {
    className: "flex cursor-pointer list-none items-center justify-between font-medium"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 items-center"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-medium"
  }, "Local Storage"), openSection[0] && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RenderImage, {
    src: openAddItem[0] ? minusIcon : plusIcon,
    width: 24,
    height: 24,
    alt: "add item",
    onClick: () => openAddItemHandler(0)
  }), localStorageItems.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RenderImage, {
    src: trashIcon,
    width: 22,
    height: 22,
    alt: "clear all",
    onClick: () => handleClearAll("localStorage")
  }), /*#__PURE__*/React.createElement(RenderImage, {
    src: copyIcon,
    width: 22,
    height: 22,
    alt: "copy all",
    onClick: () => copyContent(localStorageItems)
  })))), /*#__PURE__*/React.createElement("span", {
    className: "transition group-open:rotate-180"
  }, /*#__PURE__*/React.createElement(CarrotIcon, null))), /*#__PURE__*/React.createElement("div", {
    className: "group-open:animate-fadeIn mt-3 text-neutral-600"
  }, /*#__PURE__*/React.createElement(Table, {
    data: localStorageItems,
    storageType: "localStorage",
    handleAddItem: handleAddItem,
    handleDeleteItem: handleDeleteItem,
    copyContent: copyContent
  }), openAddItem[0] && /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      handleAddItem("localStorage", newLocalKey, newLocalValue);
    },
    "data-storage-type": "localStorage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-3"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "localKey",
    label: "Key",
    placeholder: "Key",
    name: "key",
    value: newLocalKey,
    onChange: setNewLocalKey
  })), /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-3"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "localValue",
    label: "Value",
    placeholder: "Value",
    name: "value",
    value: newLocalValue,
    onChange: setNewLocalValue
  })), /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-1 flex justify-center sm:justify-start sm:items-end sm:pb-1"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Add"
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "py-4"
  }, /*#__PURE__*/React.createElement("details", {
    className: "group",
    open: openSection[1],
    onToggle: e => {
      openSectionHandler(1, e.target.open);
    }
  }, /*#__PURE__*/React.createElement("summary", {
    className: "flex cursor-pointer list-none items-center justify-between font-medium"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 items-center"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-medium"
  }, "Session Storage"), openSection[1] && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RenderImage, {
    src: openAddItem[1] ? minusIcon : plusIcon,
    width: 24,
    height: 24,
    alt: "add item",
    onClick: () => openAddItemHandler(1)
  }), sessionStorageItems.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RenderImage, {
    src: trashIcon,
    width: 22,
    height: 22,
    alt: "clear all",
    onClick: () => handleClearAll("sessionStorage")
  }), /*#__PURE__*/React.createElement(RenderImage, {
    src: copyIcon,
    width: 22,
    height: 22,
    alt: "copy all",
    onClick: () => copyContent(sessionStorageItems)
  })))), /*#__PURE__*/React.createElement("span", {
    className: "transition group-open:rotate-180"
  }, /*#__PURE__*/React.createElement(CarrotIcon, {
    onClick: () => openSectionHandler(1)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "group-open:animate-fadeIn mt-3 text-neutral-600"
  }, /*#__PURE__*/React.createElement(Table, {
    data: sessionStorageItems,
    storageType: "sessionStorage",
    handleAddItem: handleAddItem,
    handleDeleteItem: handleDeleteItem,
    copyContent: copyContent
  }), openAddItem[1] && /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      handleAddItem("sessionStorage", newSessionKey, newSessionValue);
    },
    "data-storage-type": "sessionStorage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-3"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "sessionKey",
    label: "Key",
    placeholder: "Key",
    name: "key",
    value: newSessionKey,
    onChange: setNewSessionKey
  })), /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-3"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "sessionValue",
    label: "Value",
    placeholder: "Value",
    name: "value",
    value: newSessionValue,
    onChange: setNewSessionValue
  })), /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-1 flex justify-center sm:justify-start sm:items-end sm:pb-1"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Add"
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "py-4"
  }, /*#__PURE__*/React.createElement("details", {
    className: "group",
    open: openSection[2],
    onToggle: e => {
      openSectionHandler(2, e.target.open);
    }
  }, /*#__PURE__*/React.createElement("summary", {
    className: "flex cursor-pointer list-none items-center justify-between font-medium"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 items-center"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-medium"
  }, "Cookies"), openSection[2] && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RenderImage, {
    src: openAddItem[2] ? minusIcon : plusIcon,
    width: 24,
    height: 24,
    alt: "add item",
    onClick: () => openAddItemHandler(2)
  }), cookieItems.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RenderImage, {
    src: trashIcon,
    width: 22,
    height: 22,
    alt: "clear all",
    onClick: () => handleClearAllCookies()
  }), /*#__PURE__*/React.createElement(RenderImage, {
    src: copyIcon,
    width: 22,
    height: 22,
    alt: "copy all",
    onClick: () => copyContent(cookieItems)
  })))), /*#__PURE__*/React.createElement("span", {
    className: "transition group-open:rotate-180"
  }, /*#__PURE__*/React.createElement(CarrotIcon, {
    onClick: () => openSectionHandler(2)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "group-open:animate-fadeIn mt-3 text-neutral-600"
  }, /*#__PURE__*/React.createElement(Table, {
    data: cookieItems,
    storageType: "cookie",
    handleAddItem: handleAddCookie,
    handleDeleteItem: handleDeleteCookie,
    copyContent: copyContent
  }), openAddItem[2] && /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      handleAddCookie("cookie", newCookieKey, newCookieValue);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-3"
  }, /*#__PURE__*/React.createElement(Input, {
    autofocus: true,
    id: "cookieKey",
    label: "Key",
    placeholder: "Key",
    name: "key",
    value: newCookieKey,
    onChange: setNewCookieKey
  })), /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-3"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "cookieValue",
    label: "Value",
    placeholder: "Value",
    name: "value",
    value: newCookieValue,
    onChange: setNewCookieValue
  })), /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-1 flex justify-center sm:justify-start sm:items-end sm:pb-1"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Add"
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "py-4"
  }), /*#__PURE__*/React.createElement("div", {
    className: "py-4"
  }, /*#__PURE__*/React.createElement(Network, null)));
};
export default Storage;