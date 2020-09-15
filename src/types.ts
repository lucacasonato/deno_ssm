export type PSParameterName = string;
export type ParameterType = "String"|"StringList"|"SecureString"|string;
export type ParameterValue = string;
export type PSParameterValue = string;
export type PSParameterVersion = number;
export type PSParameterSelector = string;
export type ParameterDataType = string;

export interface Parameter {
  /**
   * The name of the parameter.
   */
  Name?: PSParameterName;
  /**
   * The type of parameter. Valid values include the following: String, StringList, and SecureString.
   */
  Type?: ParameterType;
  /**
   * The parameter value.
   */
  Value?: PSParameterValue;
  /**
   * The parameter version.
   */
  Version?: PSParameterVersion;
  /**
   * Either the version number or the label used to retrieve the parameter value. Specify selectors by using one of the following formats: parameter_name:version parameter_name:label
   */
  Selector?: PSParameterSelector;
  /**
   * Applies to parameters that reference information in other AWS services. SourceResult is the raw result or response from the source.
   */
  SourceResult?: string;
  /**
   * Date the parameter was last changed or updated and the parameter version was created.
   */
  LastModifiedDate?: Date;
  /**
   * The Amazon Resource Name (ARN) of the parameter.
   */
  ARN?: string;
  /**
   * The data type of the parameter, such as text or aws:ec2:image. The default is text.
   */
  DataType?: ParameterDataType;
}

export interface GetParameterOptions {
  /**
   * The name of the parameter you want to query.
   */
  Name: PSParameterName;
  /**
   * Return decrypted values for secure string parameters. This flag is ignored for String and StringList parameter types.
   */
  WithDecryption?: boolean;
}

export interface GetParameterResult {
  /**
   * Information about a parameter.
   */
  Parameter?: Parameter;
}