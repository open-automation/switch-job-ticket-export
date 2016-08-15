# switch-job-ticket-export
Export the Switch job ticket for debugging. Useful if processing files through many flows and making heavy use of private data. Routes an XML representation of the job ticket to the log connector and the original job to the data connector.

## Example
<img src="https://i.imgur.com/8Mk2e0C.png" width="600">

### Output
```xml
<?xml version="1.0" encoding="UTF-8"?>
<JobTicket>
  <getHierarchyPath key="getHierarchyPath"></getHierarchyPath>
  <getEmailAddresses key="getEmailAddresses"></getEmailAddresses>
  <getEmailBody key="getEmailBody"/>
  <getJobState key="getJobState"/>
  <getUserName key="getUserName"/>
  <getUserFullName key="getUserFullName"/>
  <getUserEmail key="getUserEmail"/>
  <getPriority key="getPriority"/>
  <getArrivalStamp key="getArrivalStamp">375</getArrivalStamp>
  <getName key="getName">input_file.pdf</getName>
  <getUniqueNamePrefix key="getUniqueNamePrefix">000AX</getUniqueNamePrefix>
  <getExtension key="getExtension">xml</getExtension>
  <getPrivateData key="getPrivateData">
    <Key0 key="Shawmut Job Number">155274</Key0>
    <Key1 key="Source">Test flow a</Key1>
    <Key2 key="CSR Email">dominick@p.elu.so</Key2>
  </getPrivateData>
  <getDatasets key="getDatasets">
    <Key0 key="SQLQuery">SQLQuery</Key0>
  </getDatasets>
</JobTicket>

```
