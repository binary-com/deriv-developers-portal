import React from "react"
import SchemaHeader from "./SchemaHeader"
import SchemaBody from "./SchemaBody"

const SchemaWrapper = ({ info }) => {
  const { title, description, auth_required, auth_scopes } = info

  return Object.entries(info).length !== 0 ? (
    <>
      <SchemaHeader
        title={title}
        description={description}
        auth_required={auth_required}
        auth_scopes={auth_scopes}
      />
      <SchemaBody jsonSchema={info} />
    </>
  ) : null
}

export default SchemaWrapper

