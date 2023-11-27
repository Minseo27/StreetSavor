if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/donnie/.gradle/caches/transforms-3/59096f753d559aba79f7dc2d0a59730f/transformed/hermes-android-0.72.6-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/donnie/.gradle/caches/transforms-3/59096f753d559aba79f7dc2d0a59730f/transformed/hermes-android-0.72.6-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

