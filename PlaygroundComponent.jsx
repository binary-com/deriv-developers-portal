import { api, generateDerivApiInstance } from "./appid";
import RequestJSONBox from "./RequestJSONBox";
import SelectRequestInput from "./SelectRequestInput";
import SchemaWrapper from "./SchemaWrapper";
import TokenInputField from "./TokenInputField";
import { useEffect, useRef, useState,useCallback } from "react";
import { playground_requests } from "./Playground_Requests";
import Title from "./Title";
import data_get_api_token from "./data-app-registration";
import styles from "./PlaygroundComponent.module.scss";

export const PlaygroundComponent = () => {
    const [current_api, setCurrentAPI] = useState(api)
    const [is_initial_socket, setIsInitialSocket] = useState(true)
    const [messages, setMessages] = useState([])
    const request_input = useRef(null)
    const [request_info, setRequestInfo] = useState({})
    const [response_info, setResponseInfo] = useState({})
    const [text_data, setTextData] = useState({
      request: "",
      selected_value: "Select API Call - Version 3",
      token: ""
    })

    useEffect(() => {
      const placeholder = text_data.selected_value === "Select API Call - Version 3"
      if (text_data.selected_value && !placeholder) {
        import(`./config/v3/${text_data.selected_value}/send.json`).then((data) => {
          setRequestInfo(data);
        })
        import(`./config/v3/${text_data.selected_value}/receive.json`).then((data) => {
          setResponseInfo(data);
        })
      }
    },[text_data.selected_value]);
  
    const sendRequest = useCallback(() => {
      if (
        !request_input.current?.value &&
        text_data.selected_value === "Select API Call - Version 3"
      ) {
        alert("Invalid JSON!")
        return
      }
      const _request = request_input.current?.value && JSON.parse(request_input.current?.value)
      const is_current_api_ready = current_api.connection.readyState === 1
      let relevant_api = current_api
      if (!is_current_api_ready && is_initial_socket) {
        relevant_api = generateDerivApiInstance()
        setIsInitialSocket(false)
      } else if (current_api.connection.readyState !== 1 && !is_initial_socket) {
        relevant_api = generateDerivApiInstance()
        setIsInitialSocket(true)
      }
      _request &&
        relevant_api
          .send(_request)
          .then(res =>
            setMessages([
              ...messages,
              { body: _request, type: "req" },
              { body: res, type: "res" }
            ])
          )
          .catch(err =>
            setMessages([
              ...messages,
              { body: _request, type: "req" },
              { body: err, type: "err" }
            ])
          )
      setCurrentAPI(relevant_api)
    }, [current_api, request_input, messages, is_initial_socket, text_data])
  
    const handleAuthenticateClick = useCallback(
      inserted_token => {
        const new_text_data = {
          token: inserted_token,
          selected_value: "Authorize",
          request: JSON.stringify({ authorize: inserted_token }, null, 2)
        }
        sessionStorage.setItem("session_data", JSON.stringify(new_text_data))
        Promise.resolve(setTextData({ ...new_text_data })).then(() => {
          sendRequest()
        })
      },
      [setTextData, sendRequest]
    )
  
    const handleSelectChange = useCallback(
      event => {
        event.preventDefault()
        const request_body = playground_requests.find(
          el => el.name === event.currentTarget.value
        )
        const new_text_data = {
          ...text_data,
          selected_value: event.currentTarget.value,
          request: JSON.stringify(request_body?.body, null, 4)
        }
        setTextData({ ...new_text_data })
  
        sessionStorage.setItem(
          "session_data",
          JSON.stringify({
            ...new_text_data,
            selected_value: request_body?.title
          })
        )
      },
      [text_data]
    )
  
    const handleTextAreaInput = useCallback(
      e => setTextData({ ...text_data, request: e.target.value }),
      [text_data]
    )
  
    const json_box_props = {
      current_api,
      sendRequest,
      messages,
      setMessages,
      request_example: text_data.request,
      handleChange: handleTextAreaInput,
      request_input
    }
  
    return (
      <div className={styles.playgroundPageWrapper}>
        <div className={styles.playgroundApiJson}>
          <SelectRequestInput
            selected_value={text_data.selected_value}
            handleChange={handleSelectChange}
          />
          <div className={styles.apiToken}>
            <TokenInputField
              sendTokenToJSON={handleAuthenticateClick}
              token={text_data.token}
            />
            <div/>
            <div className={styles.cta}>
              <Title headerSize="h3" className={styles.title}>
                {data_get_api_token.textFocus}
              </Title>
              <div className={styles["cta-button"]}>
                {data_get_api_token.button}
              </div>
            </div>
          </div>
          <RequestJSONBox {...json_box_props} />
        </div>
        <div id="playground" className={styles.playgroundApiDocs}>
          <div className={styles.playgroundReqSchema}>
            <SchemaWrapper info={request_info} />
          </div>
          <div className={styles.playgroundResSchema}>
            <SchemaWrapper info={response_info} />
          </div>
        </div>
      </div>
    )
  }
