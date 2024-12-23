import { useDataQuery } from '@dhis2/app-runtime'
import { CenteredContent, CircularLoader, Help, OrganisationUnitTree } from "@dhis2/ui"
import React, { useEffect, useState, useMemo } from 'react'

export default function OrgUnitTree() {
    //Here you can set your text query
    const [stringQuery, setStringQuery] = useState(undefined);
    const [key, setKey] = useState(undefined);


    const { loading, data, error } = useDataQuery(
        useMemo(
            () => ({
                orgUnits: {
                    resource: 'me',
                    params: {
                        fields: ['organisationUnits[id,path]'],
                    },

                },
            }),
            [],
        ),
    );

    const { loading: searchLoading, data: searchData, refetch: refetchOrg, error: searchError } = useDataQuery(
        useMemo(
            () => ({
                orgUnits: {
                    resource: 'organisationUnits',
                    params: ({ variables: { stringQuery: currentSearchText } }) => ({
                        fields: [
                            'id,displayName,path,publicAccess,access,lastUpdated',
                            'children[id,displayName,publicAccess,access,path,children::isNotEmpty]',
                        ].join(','),
                        paging: true,
                        query: currentSearchText,
                        withinUserSearchHierarchy: true,
                        pageSize: 15,
                    }),

                },
            }),
            [],
        ),
        { lazy: true },
    );

    useEffect(() => {
        // Sets a timeout of 500 milliseconds
        const timeoutId = setTimeout(() => {
            // The code within this block will be executed after 500 milliseconds
            if (stringQuery?.length) {
                refetchOrg({ variables: { stringQuery } });
                setKey(`${stringQuery}-${new Date().getTime()}`);
            }
        }, 500);

        // Clears the existing timer before setting a new one
        return () => clearTimeout(timeoutId);
    }, [refetchOrg, stringQuery]);

    if (error != null || searchError != null) {
        return <Help error>
            Something went wrong when loading the organisation units!
        </Help>
    }

    if (loading || searchLoading) {
        return (
            <CenteredContent>
                <CircularLoader small />
            </CenteredContent>
        )
    }

    if (!searchData?.orgUnits?.organisationUnits.length && stringQuery) {
        return <Help>
            No organisation units found
        </Help>
    }

    const renderOrgUnitTree = () => {
        if (stringQuery?.length) {
            return (
                <OrganisationUnitTree
                    key={key}
                    roots={searchData?.orgUnits?.organisationUnits ?? []}
                    expanded={expanded}
                    handleExpand={true}
                    singleSelection
                    selected={selected}
                />
            );
        }
        return (
            <OrganisationUnitTree
                key={key}
                roots={data?.orgUnits?.organisationUnits?.map(item => item?.id)}
                expanded={expanded}
                handleExpand={true}
                singleSelection
                selected={selected}
            />
        );
    };

    return (
        <>
            {renderOrgUnitTree()}
        </>
    )
}