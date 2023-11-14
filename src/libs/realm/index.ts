import { createRealmContext } from "@realm/react";
import { Historic } from "./schemas/historic";
import Realm from "realm"

const realmFileBehavior: Realm.OpenRealmBehaviorConfiguration = {
    type: Realm.OpenRealmBehaviorType.OpenImmediately,
}

export  const syncConfig:any = {   
    flexible: true,
    newRealmFileBehavior: realmFileBehavior,
    existingRealmFileBehavior: realmFileBehavior,
}

export const{ 
    RealmProvider,
    useRealm,
    useQuery,
    useObject,
} = createRealmContext({
    schema:[Historic]
})