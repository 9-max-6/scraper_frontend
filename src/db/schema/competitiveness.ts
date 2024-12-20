import * as t from 'drizzle-orm/pg-core';

const numberOfBiddersEnum = t.pgEnum('numberOfBidders', ["0", "1", "2", "3", "4"]);
const competitorProfileEnum = t.pgEnum('competitorProfile', ["0", "2", "4"]);
const partnerCapacityEnum = t.pgEnum('partnerCapacity', ["0", "1", "2", "3", "4"]);
const clientPreferenceEnum = t.pgEnum('clientPreference', ["0", "1", "3", "4"]);
const clientIntelligenceEnum = t.pgEnum('clientIntelligence', ["0", "1", "2", "3", "4"]);
const clientProcurementEnum = t.pgEnum('clientProcurement', ["0", "1", "2", "4"]);
const availabilityOfResourcesEnum = t.pgEnum('availabilityOfResources', ["0", "2", "4"]);

export const competitivenessTable = t.pgTable('competitiveness', {
    id: t.serial().primaryKey(),
    numberOfBidders: numberOfBiddersEnum().default("0"),
    competitorProfile: competitorProfileEnum().default("0"),
    partnerCapacity: partnerCapacityEnum().default("0"),
    clientPreference: clientPreferenceEnum().default("0"),
    clientIntelligence: clientIntelligenceEnum().default("0"),
    clientProcurement: clientProcurementEnum().default("0"),
    availabilityOfResources: availabilityOfResourcesEnum().default("0"),
})
