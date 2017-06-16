<template>
    <page>
        <topbar>filter组件</topbar>

        <div style="display: flex;">
            <dropdown label="1级单选">
                <single-filter :source="[
                    {
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    },
                    
                    {
                        label: '4',
                        value: 4
                    },

                    {
                        label: '5',
                        value: 5
                    },

                    {
                        label: '6',
                        value: 6
                    },

                    {
                        label: '7',
                        value: 7
                    },
                    {
                        label: '6',
                        value: 6
                    },

                    {
                        label: '7',
                        value: 7
                    },
                ]" v-model="val"></single-filter>
                <div class="dropdown-footer" style="display: flex; height: 0.48rem; width: 100%;">
                    <btn type="drak" :square="true" style="width: 30%;" @click="val = ''">重置</btn>
                    <btn type="main" :square="true" style="width: 70%;">提交</btn>
                </div>
            </dropdown>
            <dropdown label="1级多选">
                <multiple-filter :source="[
                    {
                        label: '1',
                        value: 1
                    },

                    {
                        label: '2',
                        value: 2
                    },

                    {
                        label: '3',
                        value: 3
                    },
                    
                    {
                        label: '4',
                        value: 4
                    },

                    {
                        label: '5',
                        value: 5
                    },

                    {
                        label: '6',
                        value: 6
                    },

                    {
                        label: '7',
                        value: 7
                    },
                    {
                        label: '6',
                        value: 6
                    },

                    {
                        label: '7',
                        value: 7
                    },
                ]"></multiple-filter>
            </dropdown>
            <dropdown label="N级联动">
                <link-filter :level="3" :source="[
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },{
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    }
                ]" v-model="val"></link-filter>
            </dropdown>

            <dropdown label="2级多选">
                <link-multiple-filter :source="[
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    }
                ]"></link-multiple-filter>
            </dropdown>
        </div>        
        <link-multiple-filter :source="[
            {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    },{
                        label: '1',
                        value: 1,
                        children: [
                            {
                                label: '1-1',
                                value: '1-1',
                                children: [
                                    {
                                        label: '1-1-1',
                                        value: '1-1-1'
                                    },

                                    {
                                        label: '1-1-2',
                                        value: '1-1-2'
                                    }
                                ]
                            },

                            {
                                label: '1-2',
                                value: '1-2',
                                children: [
                                    {
                                        label: '1-2-1',
                                        value: '1-2-1'
                                    },

                                    {
                                        label: '1-2-2',
                                        value: '1-2-2'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        label: '2',
                        value: 2,
                        children: [
                            {
                                label: '2-1',
                                value: '2-1',
                                children: [
                                    {
                                        label: '2-1-1',
                                        value: '2-1-1'
                                    },

                                    {
                                        label: '2-1-2',
                                        value: '2-1-2'
                                    }
                                ]
                            },

                            {
                                label: '2-2',
                                value: '2-2',
                                children: [
                                    {
                                        label: '2-2-1',
                                        value: '2-2-1'
                                    },

                                    {
                                        label: '2-2-2',
                                        value: '2-2-2'
                                    }
                                ]
                            },

                            {
                                label: '2-3',
                                value: '2-3',
                                children: [
                                    {
                                        label: '2-3-1',
                                        value: '2-3-1'
                                    },

                                    {
                                        label: '2-3-2',
                                        value: '2-3-2'
                                    }
                                ]
                            }
                        ]
                    }
                ]"></link-multiple-filter>
       

        <btn type="main" style="width: 100%" :square="true" slot="footer">提交</btn>
    </page>
</template>

<style scoped>

</style>

<script>
    import {
        Page,
        Topbar,
        SingleFilter,
        LinkFilter,
        LinkMultipleFilter,
        MultipleFilter,
        Button,
        Toast,
        Dropdown,
        Scroll
    } from 'vmui';

    console.log(LinkFilter)

    export default{
        components: {
            Page, 
            Topbar,
            SingleFilter,
            LinkFilter,
            MultipleFilter,
            LinkMultipleFilter,
            Btn: Button,
            Dropdown,
            Scroll
        },

        data(){
            return {
                val: 3
            }
        },

        // methods: {
        //     change(value, label, data){
        //         Toast('选择了' + JSON.stringify(data));
        //     }
        // }
    }
</script>