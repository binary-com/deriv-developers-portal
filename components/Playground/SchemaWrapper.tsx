import React from "react"
import SchemaHeader from "./SchemaHeader"
import SchemaBody from "./SchemaBody"

const SchemaWrapper = ({ info }) => {
  const { title, description, auth_required, auth_scopes, properties } = info

  return Object.entries(info).length !== 0 ? (
    <>
      <SchemaHeader
        title={title}
        description={description}
        auth_required={auth_required}
        auth_scopes={auth_scopes}
      />
      <SchemaBody properties={properties} />
    </>
  ) : null
}

export default SchemaWrapper

